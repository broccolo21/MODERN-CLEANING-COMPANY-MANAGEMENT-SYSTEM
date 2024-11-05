import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ClientSatisfactionChart() {
  const data = {
    labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'],
    datasets: [
      {
        label: 'Molto Soddisfatti',
        data: [65, 70, 68, 75, 78, 82],
        backgroundColor: 'rgb(34, 197, 94)',
      },
      {
        label: 'Soddisfatti',
        data: [25, 20, 25, 20, 18, 15],
        backgroundColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'Insoddisfatti',
        data: [10, 10, 7, 5, 4, 3],
        backgroundColor: 'rgb(239, 68, 68)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgb(148, 163, 184)'
        }
      },
      tooltip: {
        backgroundColor: 'rgb(15, 23, 42)',
        titleColor: 'rgb(255, 255, 255)',
        bodyColor: 'rgb(148, 163, 184)',
        padding: 12,
        borderColor: 'rgb(51, 65, 85)',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        stacked: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
          color: 'rgb(148, 163, 184)'
        }
      },
      x: {
        stacked: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
          color: 'rgb(148, 163, 184)'
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
}