import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesRepAchievement = () => {
    const [salesReps, setSalesReps] = useState([]);
    const [salesTargets, setSalesTargets] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the sales reps data from the backend
    const fetchSalesRepsAchievements = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sales-reps/achievements');
            setSalesReps(response.data);  // Assume the response has an array of sales reps with sales data
        } catch (err) {
            console.error('Error fetching sales reps achievements:', err);
            setError('Failed to fetch sales data');
        }
    };

    // Fetch sales targets for each sales rep
    const fetchSalesTargets = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sales_targets'); // Adjust the endpoint as needed
            const targets = {};
            response.data.forEach(target => {
                targets[target.salesrep_id] = target.target_amount; // Map sales rep ID to target amount
            });
            setSalesTargets(targets);
        } catch (err) {
            console.error('Error fetching sales targets:', err);
            setError('Failed to fetch sales targets');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchSalesRepsAchievements(), fetchSalesTargets()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) return <p className="text-center text-blue-600">Loading...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    // Prepare data for the bar chart
    const chartData = {
        labels: salesReps.map(rep => rep.salesRepName),  // Sales rep names as labels
        datasets: [
            {
                label: 'Total Sales',
                data: salesReps.map(rep => rep.totalSales),  // Actual sales data
                backgroundColor: 'rgba(54, 162, 235, 0.5)',  // Bar color for actual sales
            },
            {
                label: 'Target',
                data: salesReps.map(rep => salesTargets[rep.salesRepId] || 0),  // Fetch target for each sales rep
                backgroundColor: 'rgba(255, 99, 132, 0.5)',  // Bar color for target
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Representatives Achievements',
            },
        },
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Sales Representatives Achievements</h2>

            {/* Table */}
            <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Sales Rep Name</th>
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Total Sales</th>
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Target</th>
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">% of Achievement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesReps.map(rep => (
                            <tr key={rep.salesRepId} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 text-gray-700">{rep.salesRepName}</td>
                                <td className="py-2 px-4 text-gray-700">{rep.totalSales.toLocaleString()}</td>
                                <td className="py-2 px-4 text-gray-700">{(salesTargets[rep.salesRepId] || 0).toLocaleString()}</td>
                                <td className="py-2 px-4 text-gray-700">
                                    {((rep.totalSales / (salesTargets[rep.salesRepId] || 1)) * 100).toFixed(2)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bar Chart */}
            <div className="max-w-4xl mx-auto">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default SalesRepAchievement;
