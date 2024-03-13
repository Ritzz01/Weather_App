import React, { useEffect, useState } from "react";
import "./Temperature.css";

const Temperature = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("pune");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.tomorrow.io/v4/weather/realtime?location=${search}&units=metric&apikey=xf4W8uQIgsBsTuVPoNFsgkfDOchH6l3Z`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const resJson = await response.json();

        if (resJson.data && resJson.data.values) {
          setCity(resJson.data.values);
        } else {
          setCity(null);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
        setCity(null);
      }
    };

    fetchApi();
  }, [search]);

  return (
    <>
      <div className="box">
        <h1>Weather Forecast App</h1>
        <div className="inputData">
          <input
            type="search"
            value={search}
            className="inputFeild"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        {!city ? (
          <p>No data found</p>
        ) : (
          <div className="info">
            <h2 className="location">
              <i className="fas fa-street-view"></i> {search}
            </h2>
            <h2 className="temp">{city.temperature}deg</h2>
         
          </div>
        )}
      </div>
    </>
  );
};

export default Temperature;
