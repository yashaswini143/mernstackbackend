import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function SalesGrowth(){
  const [salesgrowthData, setSalesgrowthData] = useState({labels: [],datasets: []});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesGrowthRateResponse = await axios.get('http://localhost:3000/salesgrowthrate');
        const salesGrowthRateData = salesGrowthRateResponse.data;

        setSalesgrowthData({
          labels: salesGrowthRateData.map(item => item.month), 
          datasets: [{
            label: 'Sales Growth Rate (%)',
            data: salesGrowthRateData.map(item => item.growthRate),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false,
            tension: 0.1,
          }]
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  if (loading) {
    return <p>Loading chart...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div style={{ width: '80%', margin: '0 auto', }}>
        <h2>Sales Growth Rate</h2>
        <Line
          data={salesgrowthData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) label += ': ';
                    if (context.parsed.y !== null) {
                      label += context.parsed.y + '%';
                    }
                    return label;
                  }
                }
              }
            },
            scales: {
              x: { title: { display: true, text: 'Date' }},
              y: {
                title: { display: true, text: 'Growth Rate (%)' },
                ticks: {
                  callback: function(value) {
                    return value + '%';
                  }
                }
              }
            }
          }}
        />
      </div>

  )

}

export default SalesGrowth;
