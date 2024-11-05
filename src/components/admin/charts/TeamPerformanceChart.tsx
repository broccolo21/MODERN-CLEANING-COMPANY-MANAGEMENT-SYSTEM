import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export function TeamPerformanceChart() {
  const data = {
    labels: ['Puntualità', 'Qualità', 'Velocità', 'Feedback Cliente', 'Protocolli', 'Collaborazione'],
    datasets: [
      {
        label: 'Team A',
        data: [95, 89, 90, 96, 94, 88],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
      },
      {
        label: 'Team B',
        data: [88, 96, 85, 88, 90, 95],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
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
      r: {
        min: 0,
        max: 100,
        ticks: {
          color: 'rgb(148, 163, 184)',
          backdropColor: 'transparent'
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        angleLines: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        pointLabels: {
          color: 'rgb(148, 163, 184)'
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Radar data={data} options={options} />
    </div>
  );
}