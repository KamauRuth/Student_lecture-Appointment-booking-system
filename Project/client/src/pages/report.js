import axios from 'axios';
import Layout from '../components/layout';
import React, { useEffect, useState } from 'react';

function Report() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // If you need to fetch report data for display purposes, adjust the endpoint accordingly
    axios.get('/api/admin/report')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => console.error('Error fetching report:', error));
  }, []);

  function downloadCSV() {
    axios({
      url: '/api/admin/report/csv', // Change this to the correct path
      method: 'GET',
      responseType: 'blob', // Important: This ensures the response is a Blob
    })
    .then((response) => {
      // Create a URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // Create a link element
      const link = document.createElement('a');
      // Set the download attribute with a filename
      link.href = url;
      link.setAttribute('download', 'report.csv');
      // Append to the document and click to trigger the download
      document.body.appendChild(link);
      link.click();
      // Clean up
      link.parentNode.removeChild(link);
    })
    .catch(error => console.error('Error downloading the CSV file:', error));
  }

  return (
    <Layout>
      <div>
        <h1>Appointment Report</h1>
        <button onClick={downloadCSV}>Download CSV</button>
        <table>
          <thead>
            <tr>
              <th>Reason</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.reason}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Report;
