import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
const WorkOrderStatus = () => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/requestOptions/byStatus');
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
    console.log('the mapped data',labels)
    const counts = pieChartData.map((data) => data.count);
    console.log('the mapped count data',counts)
    
    const ctx = document.getElementById('myPieChart3').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: [
            'rgba(173, 1, 1)',
            'rgb(16, 112, 201)',
            'rgb(10, 158, 77)',
            'rgba(3, 59, 38,0.6)',
            'rgb(167, 199, 24)'
          ],
          borderColor: [
            'rgba(255, 255, 255)',
            'rgb(16, 112, 201)',
            'rgb(10, 158, 77)',
            'rgba(3, 59, 38,0.6)',
            'rgb(167, 199, 24)'
          ],
          borderWidth: 0.5
        }]
      },
      options: {
        cutout: '70%',
        plugins: {
          customCanvasBackgroundColor: {
            color: 'white',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = labels[context.dataIndex] + ': ';
                label += counts[context.dataIndex] + ' Requests'; // Append number of items
                return label;
              }
            }
          },
          legend: {
            display:true,
            align: 'bottom',
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
            text: 'Request Status',
            position:'bottom',
            color: 'black',
            font:{
              weight: 'bold',
              size: 20,
              family: '-apple-system'
            }   
          }
        },   
      }
      
    });
  };
  
  return (
    <div className='charter'>
      <canvas className='pieDepartment' id="myPieChart3" width="220" height="220"></canvas>
    </div>
  );
};

export default WorkOrderStatus;
