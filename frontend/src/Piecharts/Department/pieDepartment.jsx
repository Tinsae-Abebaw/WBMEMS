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
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: [
            'rgb(133, 6, 6)',
            'rgba(133, 6, 6,0.9)',
            'rgba(133, 6, 6, 0.8)',
            'rgba(133, 6, 6, 0.7)',
            'rgba(133, 6, 6,0.5)',
            'rgba(133, 6, 6,0.2)',
            'rgba(133, 6, 6)'
 
          ],
          borderColor: [
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)'
          ],
          borderWidth: 0.5
        }]
      },
      options: {
        cutout: '60%',
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
            align: 'left',
            position: 'bottom', 
            labels: {
              color:'black',
              font:{
                size: 20,
                color: 'black',
                weight: 'bold',
                family: '-apple-system'
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
              size: 22,
              family: '-apple-system'
            }   
          }
        },   
      }
      
    });
  };
  
  return (
    <div className='charter'>
      <canvas className='pieDepartment' id="myPieChart" width="200" height="200"></canvas>
    </div>
  );
};

export default PieDepartment;
