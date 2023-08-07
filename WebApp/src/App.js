import { useEffect, useState } from 'react';
import './App.css';


const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error.message));
  }, []);

  return (<div className="App">
    {Object.keys(data).length
      ? <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Temperature</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map(key => {
            const row = data[key];

            return <tr>
              <td>{row.Source}</td>
              <td>{row.Temperature}°</td>
              <td>{row.Humidity}%</td>
            </tr>;
          }
          )}
        </tbody>
      </table>
      : <div className="spinner"><img src="loader.gif" alt="Loading..." /></div>
    } </div>);
}

export default App;
