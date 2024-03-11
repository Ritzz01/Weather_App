// import React, { useEffect, useState } from "react";
// import "./Temperature.css";

// const Temperature = () => {
//   const [city, setCity] = useState(null);
//   const [search, setSearch] = useState("pune");

//   useEffect(() => {
//     const fetchApi = async () => {
//       const url = `https://api.tomorrow.io/v4/weather/realtime?location=${search}&units=metric&apikey=xf4W8uQIgsBsTuVPoNFsgkfDOchH6l3Z`;
//       const response = await fetch(url);
//       const resJson = await response.json();
//       // console.log(resJson);

//       setCity(resJson.data.values);
//     };

//     fetchApi();
//   }, [search]);

//   return (
//     <>
//       <div className="box">
//         <h1>Weather Forecast App</h1>
//         <div className="inputData">
//           <input
//             type="search"
//             value={search}
//             className="inputFeild"
//             onChange={(event) => {
//               setSearch(event.target.value);
//             }}
//           />
//         </div>
//       </div>


 

// {!city  ? (
//   <p>No data found</p>
// ) : (
//   <div className="info">
//     <h2 className="location">
//       <i className="fas fa-street-view"></i> {search}
//     </h2>

//     <h2 className="temp">{city.temperature}</h2>
//     <h3 className="tempmin_max">min 34deg | max 34deg</h3>
//   </div>
// )}


//     </>
//   );
// };
// export default Temperature;


import React, { useEffect, useState } from "react";
import "./Temperature.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Temperature = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("pune");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://api.tomorrow.io/v4/weather/realtime?location=${search}&units=metric&apikey=xf4W8uQIgsBsTuVPoNFsgkfDOchH6l3Z`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const resJson = await response.json();
        setCity(resJson.data.values);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
        setError("An error occurred while fetching weather data.");
      } finally {
        setLoading(false);
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


  {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && !city ? (
        <p>No data found</p>
      ) : (
        <div className="info">
          <h2 className="location">
            <i className="fas fa-street-view"></i> {search}
          </h2>

          <h2 className="temp">{city ? city.temperature : "N/A"}</h2>
         
        </div>
      )}

</div>
    </>
  );
};

export default Temperature;
