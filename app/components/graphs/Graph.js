"use client"
import { Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getFirestore, doc, Timestamp, onSnapshot } from 'firebase/firestore';
import { app } from "../../db/firebase";
import { timeDisplayHourly } from './graphHelpers/time';
const db = getFirestore(app);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Real-time Chart.js Line Chart',
    },
  },
};

const timeRanges = {
  'Daily': 'hours',
  'Weekly': 'days',
  'Monthly': 'months',
  'Yearly': 'years',
};

export default function Graph() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Statistics',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  });

  const [timeRange, setTimeRange] = useState('Daily');

  useEffect(() => {
    const now = new Date();
    const startDate = new Date();

    switch (timeRange) {
      case 'Daily':
        startDate.setTime(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
        break;
      case 'Weekly':
        startDate.setTime(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
        break;
      case 'Monthly':
        startDate.setMonth(now.getMonth() - 1); // 1 month ago
        break;
      case 'Yearly':
        startDate.setFullYear(now.getFullYear() - 1); // 1 year ago
        break;
      default:
        break;
    }
    const startTimestamp = Timestamp.fromDate(startDate);
    const date = Timestamp.now().toDate(); // Convert to JavaScript Date object
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    const day = date.getDate();
    const docRef = doc(db, 'years', `${year}`, 'months', `${month}`, 'days', `${day}`)

    // Listen for changes
    const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
        const transactions = doc.data().transactions.filter(data => data.date >= startTimestamp)
        const chartData = prepareChartData(transactions, timeRange);
        setData(chartData);
        } else {
        console.log("No such document!");
        }
    });

    return () => unsubscribe();
  }, [timeRange]);

  return (
    <div>
      {Object.keys(timeRanges).map(range => (
        <button key={range} onClick={() => setTimeRange(range)}>
          {range}
        </button>
      ))}
      <Line options={options} data={data} />
    </div>
  );
}

function prepareChartData(snapshotData) {
  // TODO: Implement logic to calculate averages and prepare data for chart
  // The exact implementation will depend on the specifics of your data and how you want to present it
  
  return {
    labels: snapshotData.map(d => timeDisplayHourly(d.date)),
    datasets: [
      {
        label: 'Statistics',
        data: snapshotData.map(d => d.value),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
}
