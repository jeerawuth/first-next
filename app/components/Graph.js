"use client"
import { app } from "../db/firebase";
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
import { onSnapshot, getFirestore, collection, query, orderBy } from 'firebase/firestore';

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

  useEffect(() => {
    const q = query(collection(db, 'statistics'), orderBy('date'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedData = {
        labels: [],
        datasets: [
          {
            label: 'Statistics',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };
      snapshot.docs.forEach(doc => {
        const docData = doc.data();
        updatedData.labels.push(docData.date.toDate().toLocaleDateString());
        updatedData.datasets[0].data.push(docData.value);
      });
      setData(updatedData);
    });
    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  return <Line options={options} data={data} />;
}
