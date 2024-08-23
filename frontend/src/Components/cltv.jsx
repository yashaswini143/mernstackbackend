import { Bar } from 'react-chartjs-2'; 
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend); 

function CustomerLTV(){
const [cltvData, setCltvData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cltvResponse = await axios.get('http://localhost:3000/cltvcohorts');
        const cltvData1 = cltvResponse.data;

        setCltvData({
          labels: cltvData1.map(item => item._id),
          datasets: [{
            label: 'Average Lifetime Value per Cohort',
            data: cltvData1.map(item => item.averageLifetimeValue),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
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
        <h2>Customer Lifetime Value by Cohort</h2>
        <Bar
          data={cltvData}
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
                      label += new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(context.parsed.y);
                    }
                    return label;
                  }
                }
              }
            },
            scales: {
              x: { title: { display: true, text: 'Cohort' }},
              y: {
                title: { display: true, text: 'Average Lifetime Value' },
                ticks: {
                  callback: function(value) {
                    return new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(value);
                  }
                }
              }
            }
          }}
        />
      </div>

  )

}
export default CustomerLTV;

