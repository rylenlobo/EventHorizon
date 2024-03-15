import { Checkout } from "capacitor-razorpay";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { fireDB } from "../src/firebase/firbaseConfig";
import { api } from "../services/api";

export const createRazorpayOrder = (param) =>
  axios.post(`${api}/order`, param).then((response) => response.data);

export const payWithRazorpay = async (param) => {
  const options = {
    key: "rzp_test_NqTeCveAfsxaRq",
    amount: (param.amount * 100).toString(),
    currency: "INR",
    order_id: param.order_id, // Use the order ID from the response
    name: param.name,
    theme: {
      color: "#50409A",
    },
  };

  try {
    return (await Checkout.open(options)).response;
  } catch (error) {
    console.error(error);
  }
};

export const confirmPayment = async (param) => {
  try {
    const response = await axios.post(`${api}/confirm-payment`, param);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const redirectPaymentGateway = async (
  amount,
  name,
  userID,
  eventID,
  eventImage,
  eventVenue,
  eventDate,
  eventTime
) => {
  const IST = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  const ISTDate = new Date(IST);
  const formattedDate = ISTDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  try {
    const order_data = await createRazorpayOrder({
      amount: Number(amount) * 100,
      currency: "INR",
    });

    const data = await payWithRazorpay({
      amount: amount * 100,
      order_id: order_data.id,
      name: name,
    });

    if (data?.razorpay_signature) {
      const order_param = {
        order_id: order_data.id,
        payment_id: data?.razorpay_payment_id,
        razorpay_signature: data?.razorpay_signature,
      };

      const orderConfirmStatus = await confirmPayment(order_param);
      if (orderConfirmStatus == "success") {
        await addDoc(
          collection(fireDB, "users", userID, "paymentsandRegistrations"),
          {
            event_name: name,
            status: "success",
            amount: amount,
            day: formattedDate,
          }
        );
        await addDoc(collection(fireDB, "users", userID, "passes"), {
          user: userID,
          event_image: eventImage,
          event_name: name,
          event_date: eventDate,
          event_time: eventTime,
          event_venue: eventVenue,
          qrcode: data.razorpay_signature,
        });
        await addDoc(collection(fireDB, "events", eventID, "generatedPasses"), {
          user: userID,
          qrcode: data.razorpay_signature,
        });
      }
    }
  } catch (e) {
    await addDoc(
      collection(fireDB, "users", userID, "paymentsandRegistrations"),
      {
        event_name: name,
        status: "failed",
        amount: amount,
        day: formattedDate,
      }
    );
  }
};
