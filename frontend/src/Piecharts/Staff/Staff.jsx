import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Staff = () => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/registration/staff');
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
    const labels = pieChartData.map((data) => data.occupation);
    const costs = pieChartData.map((data) => data.count);
    const ctx = document.getElementById('myPieChart6').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: costs,          
          backgroundColor: [
            'rgba(2, 92, 54)',
            'rgba(2, 92, 54,0.95)',
            'rgba(2, 92, 54,0.8)',
            'rgba(2, 92, 54,0.7)',
            'rgba(2, 92, 54,0.6)',
            'rgba(2, 92, 54,0.5)',
            'rgba(2, 92, 54,0.4)'
          ],
          borderColor: [
            'rgb(255, 255, 255)',
            'rgb(255, 255, 255)',
            'rgb(255, 255, 255)',
            'rgb(255, 255, 255)',
            'rgb(255, 255, 255)',
            'rgb(255, 255, 255)',
            'rgb(255, 255, 255)'
          ],
          borderWidth: 0.5
        }]
      },
      options: {
        cutout: '60%',
        barThickness: 20,
        plugins: {
            customCanvasBackgroundColor: {
              color: 'black',
            },
            tooltip: {
              
            },
            legend: {
              display:true,
              color: 'white',
              align: 'bottom',
              position: 'bottom', 
              labels: {
                color: 'black',
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
              text: 'Staff Information',
              position:'bottom',
              color: 'black',
              font:{
                weight: 'bold',
                size: 25,
                family: '-apple-system'
              }   
            }
        }}
    });
  };

  return (
    <div className='charter'>
      <canvas className='pieDepartment' id="myPieChart6" width="200" height="200"></canvas>
    </div>
  );
};

export default Staff;
