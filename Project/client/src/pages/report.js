import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';

function Report() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/report')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching report:', error));
  }, []);

  return (
    <Layout>
    <div>
      <h1>Appointment Report</h1>
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
              <td>{item._id}</td>
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
