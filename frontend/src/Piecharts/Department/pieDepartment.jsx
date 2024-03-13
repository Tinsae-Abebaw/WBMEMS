import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './pieDepartment.css';

const PieDepartment = () => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/deviceRegistration/byDepartment');
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
    const labels = pieChartData.map((data) => data.equipmentDepartment);
    const counts = pieChartData.map((data) => data.count);
    console.log('Pie chart data:', pieChartData);
  
    const ctx = document.getElementById('myPieChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: [
            'rgba(12, 89, 130',
            'rgb(190, 228, 21)',
            'rgb(195, 139, 197)',
            'rgb(77, 6, 99)',
            'rgb(94, 1, 44)',
            'rgb(89, 163, 108)',
            'rgb(145, 15, 155)'
 
          ],
          borderColor: [
            'rgba(12, 89, 130)',
            'rgb(190, 228, 21)',
            'rgb(195, 139, 197)',
            'rgb(77, 6, 99)',
            'rgb(94, 1, 44)',
            'rgb(89, 163, 108)',
            'rgb(145, 15, 155)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          customCanvasBackgroundColor: {
            color: 'white',
          },
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
            display:true,
            align: 'right',
            position: 'bottom', 
            labels: {
              color:'black',
              font:{
                size: 17,
                color: 'black',
                weight: 'bold'
              }
            },
            
          },
          title: {
            display:true,
            text: 'Quantity of devices in each Department',
            position:'bottom',
            color: 'black',
            font:{
              weight: 'bold',
              size: 20
            }   
          }
        },   
      }
      
    });
  };
  
  return (
    <div className='charter'>
      <canvas className='pieDepartment' id="myPieChart" width="300" height="300"></canvas>
    </div>
  );
};

export default PieDepartment;
