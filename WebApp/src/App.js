import { useEffect, useState } from 'react';
import './App.css';


const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = () => {
    setLoading(true);
    fetch(process.env.REACT_APP_API_URL)
      .then(response => response.json())
      .then(data => { setData(data); })
      .catch(error => console.log(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWeatherData();
    setInterval(() => fetchWeatherData(), 1000 * 600);
  }, []);

  return (<div className="App">
    {loading || data === null
      ? <div className="spinner"><img src="loader.gif" alt="Loading..." /></div>
      : <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Received (UTC)</th>
            <th>Temperature</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map(key => {
            const row = data[key];

            return <tr key={key}>
              <td>{row.Source}</td>
              <td>{row.ReceivedOn}</td>
              <td>{row.Temperature}°</td>
              <td>{row.Humidity}%</td>
            </tr>;
          }
          )}
        </tbody>
      </table>
    } </div>);
}

export default App;
