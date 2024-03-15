import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";

const DashboardGraph = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const reportsCollection = collection(fireDB, "reports");
        const snapshot = await getDocs(reportsCollection);
        const reports = snapshot.docs.map((doc) => doc.data());
        setReportData(reports);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchReportData();
  }, []);

  if (!reportData || reportData.length === 0) {
    return <div style={{ alignItems: "center", paddingLeft: 700, paddingTop: 300 }}>Loading...</div>;
  }

  // Process data to prepare for statistics
  // You need to extract event names and registered users for the bar graph
  // And calculate percentages of attendees and absent students for the pie chart
  // This is a simplified example, adjust as per your actual data structure
  const eventData = reportData.map((report) => ({
    eventName: report.event,
    registeredUsers: report.registeredUsers,
    attendees: parseInt(report.attendees),
    absents: parseInt(report.absents),
  }));

  // Prepare data for the bar graph
  const barData = {
    labels: eventData.map((event) => event.eventName),
    datasets: [
      {
        label: "Registered Users",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        data: eventData.map((event) => event.registeredUsers),
      },
    ],
  };

  // Prepare data for the pie charts
  const pieData = eventData.map((event) => ({
    eventName: event.eventName,
    data: [
      { id: 0, value: event.attendees, label: `Attendees: ${((event.attendees / event.registeredUsers) * 100).toFixed(2)}%` },
      { id: 1, value: event.absents, label:`Absents: ${((event.absents / event.registeredUsers) * 100).toFixed(2)}%` },
    ],
  }));

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div>
        <h2 style={{ color: "white" }}>Event Statistics</h2>
        <div style={{ width: "50%", margin: "auto" }}>
          <h3 style={{ color: "white" }}>Registered Users by Event</h3>
          <BarChart
            xAxis={[
              { 
                scaleType: "band", 
                data: eventData.map((event) => event.eventName),
                title: { display: true, text: 'Event Name', color: 'white' },
                labels: { color: 'white' }
              }
            ]}
            series={[
              { data: eventData.map((event) => event.registeredUsers), label: 'Registered User' ,},
              { data: eventData.map((event) => event.attendees), label: 'Present' },
              { data: eventData.map((event) => event.absents), label: 'Absent' },
            ]}
            width={500}
            height={300}
            // Apply styles to the chart
            options={{
              legend: { fontColor: "white" },
              scales: {
                x: { 
                  title: { display: true, color: "white" },
                  ticks: { color: "white" }
                },
                y: { 
                  title: { display: true, color: "white" },
                  ticks: { color: "white" }
                },
              },
            }}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: "50px" }}>
          {pieData.map((event, index) => (
            <div key={index}>
              <h3 style={{ color: "white" }}>{event.eventName}</h3>
              <PieChart
                series={[
                  { data: event.data },
                ]}
                width={500}
                height={200}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;
