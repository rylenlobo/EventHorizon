import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";

const EventReportPage = () => {
  const { eventId } = useParams();
  const [eventReport, setEventReport] = useState(null);

  useEffect(() => {
    const fetchEventReport = async () => {
      try {
        const reportsCollection = collection(fireDB, "reports");
        const snapshot = await getDocs(reportsCollection);
        const reports = snapshot.docs.map((doc) => doc.data());
        const eventReportData = reports.find((report) => report.eventId === eventId);
        setEventReport(eventReportData);
      } catch (error) {
        console.error("Error fetching event report:", error);
      }
    };

    fetchEventReport();
  }, [eventId]);

  if (!eventReport) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{margin:10 ,}}>
      <h2>{eventReport.eventName} Report</h2>
      <div>
        <h3>Total Expenditure vs Earning</h3>
        <BarChart
          xAxis={[{ scaleType: "band", data: ["Expenditure", "Earning"] }]}
          series={[{ data: [eventReport.expenditure, eventReport.earning] }]}
          width={500}
          height={300}
        />
      </div>
      <div>
        <h3>Event Details</h3>
        <p><strong>Event Name:</strong> {eventReport.eventName}</p>
        <p><strong>Description:</strong> {eventReport.description}</p>
        <p><strong>Total Earning:</strong> {eventReport.earning}</p>
        <p><strong>Entry Fee:</strong> {eventReport.entryFee}</p>
        <p><strong>Total Expenditure:</strong> {eventReport.expenditure}</p>
      </div>
    </div>
  );
};

export default EventReportPage;
