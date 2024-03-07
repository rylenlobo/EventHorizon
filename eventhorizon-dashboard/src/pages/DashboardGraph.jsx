import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2'; // Import Bar from react-chartjs-2
import Dashboard from './Dashboard'; // Import the original Dashboard component

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 800,
    margin: 'auto',
    marginTop: 4,
  },
}));

const DashboardWithGraph = () => {
  const classes = useStyles();

  // Example of creating data for a graph
  const graphData = {
    labels: ['Event 1', 'Event 2', 'Event 3'], // Sample event names
    datasets: [
      {
        label: 'Registered Users',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80], // Sample data, you should replace with actual data
      },
    ],
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Registered Users Graph
      </Typography>
      {/* Ensure that each chart has a unique key */}
      <Bar
        key="registered-users-chart"
        data={graphData}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
        }}
      />
      {/* Render the original Dashboard component */}
      <Dashboard />
    </div>
  );
};

export default DashboardWithGraph;
