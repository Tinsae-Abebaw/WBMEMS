import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const EquipmentByCost = () => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/reportOptions/EquipmentWithCost');
        setPieChartData(response.data);
        console.log('the couple data', response.data);
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
    const labels = pieChartData.map((data) => data.reportType.replace(/^\w/, c => c.toUpperCase()));
    const costs = pieChartData.map((data) => data.cost);
    const ctx = document.getElementById('myPieChart5').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: costs,
          backgroundColor: [
            'rgb(3, 59, 38)',
            'rgba(3, 59, 38,0.9)',
            'rgba(3, 59, 38,0.8)',
            'rgba(3, 59, 38,0.7)',
            'rgba(3, 59, 38,0.6)',
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
              text: 'Respective Costs',
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
      <canvas className='pieDepartment' id="myPieChart5" width="200" height="200"></canvas>
    </div>
  );
};

export default EquipmentByCost;
