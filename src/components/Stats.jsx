// filepath: c:\Users\carlo\OneDrive\Escritorio\programas\Evidencia2\Evidencia2\src\components\Stats.jsx
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(BarElement, CategoryScale, LinearScale);

function Stats({ total, max, min }) {
    const data = {
        labels: ['precio Minimo', 'precio Maximo'],
        datasets: [
            {
                label: 'Precios',
                data: [min, max],
                backgroundColor: ['#f87171', '#4ade80'],
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: false },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    return (
        <div>
            <h2>Estadísticas</h2>
            <p>Productos totales: {total}</p>
            <p>Precio máximo: {max}</p>
            <p>Precio mínimo: {min}</p>
            <Bar data={data} options={options} />
        </div>
    );
}

export default Stats;