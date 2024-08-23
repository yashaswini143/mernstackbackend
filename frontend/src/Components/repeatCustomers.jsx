import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
function RepeatCustomers(){
  const [repeatCustomersData, setRepeatCustomersData] = useState({
    daily: [],
    monthly: [],
    quarterly: [],
    yearly: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/repeatcustomers');
        setRepeatCustomersData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const createChartData = (data, timeFrame) => {
    return {
      labels: data.map(item => item._id),
      datasets: [
        {
          label: `Repeat Customers (${timeFrame})`,
          data: data.map(item => item.repeatCustomers),
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
        },
      ],
    };
  };


  if (loading) {
    return <p>Loading chart...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2>Repeat Customers Over Time</h2>
      {['daily', 'monthly', 'quarterly', 'yearly'].map((timeFrame) => (
        <div key={timeFrame} style={{ marginBottom: '40px' }}>
          <h3>{timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}</h3>
          <Line
            data={createChartData(repeatCustomersData[timeFrame] || [], timeFrame)}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Time Period'
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Number of Repeat Customers'
                  },
                  ticks: {
                    precision: 0
                  }
                }
              }
            }}
          />
        </div>
      ))}
    </div>

  )
}

export default RepeatCustomers;
