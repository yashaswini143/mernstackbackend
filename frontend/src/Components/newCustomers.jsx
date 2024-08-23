import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function NewCustomer(){
  const [newCustomers,setNewCustomers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newcustomersResponse = await axios.get('http://localhost:3000/newcustomers');
        const newcustomersData = newcustomersResponse.data;

        setNewCustomers({
          labels: newcustomersData.map(item => `${item.year}-${item.month.toString().padStart(2, '0')}`),
          datasets: [{
            label: 'New Customers Added',
            data: newcustomersData.map(item => item.newCustomers),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
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
      <h2>New Customers Added Over Time</h2>
      <Line
        data={newCustomers}
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
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Number of New Customers'
              },
              ticks: {
                precision: 0 
              }
            }
          }
        }}
      />
    </div>

  )

}

export default NewCustomer;
