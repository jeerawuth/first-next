"use client"
import { Line } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/providers/authContext';

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
import Spinner from '../Spinner';
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

export default function GraphDaily({ siteId, machineId, portNumber }) {
  const { user , loading } = useAuth();
  const [ error , setError]  = useState(null);

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

  useEffect(() => {
    const date = Timestamp.now().toDate(); // Convert to JavaScript Date object
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    const day = date.getDate();
    const docRef = doc(db, 'sites', `${siteId}`,'machines', `${machineId}`,'ports', `${portNumber}`, 'years', `${year}`, 'months', `${month}`, 'days', `${day}`)

    // Listen for changes
    const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
        const transactions = doc.data().transactions;
        const chartData = prepareChartData(transactions);
        setData(chartData);
        } else {
        console.log("No such document!");
        }
    }, (error) => {
      // when have got error
        setError(error.message);
    });
    if(user) {
      setError(null)
    }
    return () => unsubscribe();
  }, [siteId, machineId, portNumber, user]);



  if(loading) {
    return <Spinner />
  } 
  

  return (
    <>
    {error && <div>{error}</div>}
    {user && (
    <div>
      <Line options={options} data={data} />
    </div>
    )}
    </>
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
