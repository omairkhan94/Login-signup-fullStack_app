



import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const data = {
        labels: ['Sales', 'Marketing', 'Producion', 'EGrouth', 'Inv', 'Commerce'],
        datasets: [
            {
                label: 'Weekly Report',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                position: 'top',
            },
            // title: {
            //     display: true,
            //     text: 'Monthly Sales',
            // },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;