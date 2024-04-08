import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './Piechart.css';

const Piechart = () => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/deviceRegistration/Piechart');
        setPieChartData(response.data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (pieChartData.length > 0) {
      drawPieChart();
    }
  }, [pieChartData]);

  const drawPieChart = () => {
    const labels = pieChartData.map((data) => data.status);
    const counts = pieChartData.map((data) => data.count);
   
    
    const ctx = document.getElementById('myPieChart2').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: [
            'rgb(4, 45, 92)',
            'rgba(4, 45, 92, 0.8)',
          ],
          borderColor: [
            'rgb(255, 255, 255)',
            'rgb(255, 255, 255)',
          
          ],
          borderWidth: 0.5
        }]
      },
      options: {
        cutout: '60%',
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = labels[context.dataIndex] + ': ';
                label += counts[context.dataIndex] + ' Devices'; // Append number of items
                return label;
              }
            }
          },
          legend: {
            position: 'bottom', 
            align: 'bottom' ,
            color: 'black',
            labels: {
              color: 'black',
              font: {
                 weight: 'bold',
                 size:20,
                 family: '-apple-system',
                 color: 'black',
              }
            },
            
          },
          title: {
            display:true,
            text: 'Active and Disposed Devices',
            position:'bottom',
            color: 'black',
            align: 'center',
            font:{
              weight: 'bold',
              family: 'Arial',
              size: 20,
            }
            
          }
        }, 
        
      }
    });
  };
  
  return (
    <div>
      <canvas id="myPieChart2" width="190" height="190"></canvas>
    </div>
  );
};

export default Piechart;
