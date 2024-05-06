import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
const RequestType = () => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/requestOptions/RequestType');
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
    const labels = pieChartData.map((data) => data.requestType.replace(/^\w/, c => c.toUpperCase()));
    const counts = pieChartData.map((data) => data.count);
    
    const ctx = document.getElementById('myPieChart4').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: [
            'rgba(4, 38, 90)',
            'rgba(4, 38, 90,0.9)',
            'rgba(4, 38, 90,0.8)',
            'rgba(4, 38, 90,0.7)',
            'rgba(4, 38, 90,0.6)',
            'rgba(4, 38, 90,0.5)'
 
          ],
          borderColor: [
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
            'rgba(255, 255, 255)',
          ],
          borderWidth: 0.5
        }]
      },
      options: {
        cutout: '60%',
        barThickness: 15,
        plugins: {
          customCanvasBackgroundColor: {
            color: 'white',
          },
          tooltip: {
           
          },
          legend: {
            display:true,
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
            text: 'Request Type',
            position:'bottom',
            color: 'black',
            font:{
              weight: 'bold',
              size: 25,
              color: 'black',
              family: '-apple-system'
            }   
          }
        },   
      }
      
    });
  };
  
  return (
    <div className='charter'>
      <canvas className='pieDepartment' id="myPieChart4" width="200" height="200"></canvas>
    </div>
  );
};

export default RequestType;
