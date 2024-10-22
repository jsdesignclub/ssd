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

const CompanySalesReport = () => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch sales data from the backend
    const fetchSalesData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/company-sales'); // Adjust the endpoint as needed
            setSalesData(response.data);  // Assume the response has an array of sales data
            setLoading(false);
        } catch (err) {
            console.error('Error fetching sales data:', err);
            setError('Failed to fetch sales data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalesData();
    }, []);

    if (loading) return <p className="text-center text-blue-600">Loading...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    // Prepare data for the bar chart
    const chartData = {
        labels: salesData.map(data => data.month),  // Monthly labels
        datasets: [
            {
                label: 'Total Sales',
                data: salesData.map(data => data.totalSales),  // Total sales data for each month
                backgroundColor: 'rgba(54, 162, 235, 0.5)',  // Bar color for total sales
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
                text: 'Company Sales Report',
            },
        },
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Company Sales Report</h2>

            {/* Table */}
            <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Month</th>
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Total Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesData.map(data => (
                            <tr key={data.month} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 text-gray-700">{data.month}</td>
                                <td className="py-2 px-4 text-gray-700">{data.totalSales.toLocaleString()}</td>
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

export default CompanySalesReport;
