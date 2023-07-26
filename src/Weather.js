import React from "react";
import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
import loader from "./assets/WeatherIcons.gif";
import logo from "./assets/magnifying-glass-solid.svg";
import ReactAnimatedWeather from "react-animated-weather";
const dateFormatter = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};
class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
    visibility: undefined,
    windSpeed: undefined,
    query: "",
  };

  componentDidMount() {
    if (navigator.geolocation) {
      //Geolocation is availiable to browser
      this.getPosition()
        .then((position) => {
          //user allowed loaction access
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          //User denied location access
          this.getWeather(28.67, 77.22);
          alert(
            "Allowing access to location is required to show current weather updates"
          );
        });
    } else {
      //Geolocation not available
      alert("Geolocation not availiable");
    }

    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    );

    const data = await api_call.json();

    console.log(data);

    this.setState({
      lat: lat,
      lon: lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      main: data.weather[0].main,
      country: data.sys.country,
      windSpeed: data.wind["speed"],
      visibility: data.visibility,
    });

    switch (this.state.main) {
      case "Haze":
        this.setState({ icon: "CLEAR_DAY" });
        break;
      case "Clouds":
        this.setState({ icon: "CLOUDY" });
        break;
      case "Rain":
        this.setState({ icon: "RAIN" });
        break;
      case "Snow":
        this.setState({ icon: "SNOW" });
        break;
      case "Dust":
        this.setState({ icon: "WIND" });
        break;
      case "Drizzle":
        this.setState({ icon: "SLEET" });
        break;
      case "Fog":
        this.setState({ icon: "FOG" });
        break;
      case "Smoke":
        this.setState({ icon: "FOG" });
        break;
      case "Tornado":
        this.setState({ icon: "WIND" });
        break;
      default:
        this.setState({ icon: "CLEAR_DAY" });
    }
  };

  getCityWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?q=${this.state.query}&units=metric&APPID=${apiKeys.key}`
    );

    const data = await api_call.json();

    console.log(data);

    this.setState({
      lat: lat,
      lon: lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      main: data.weather[0].main,
      country: data.sys.country,
      windSpeed: data.wind["speed"],
      visibility: data.visibility,
    });

    switch (this.state.main) {
      case "Haze":
        this.setState({ icon: "CLEAR_DAY" });
        break;
      case "Clouds":
        this.setState({ icon: "CLOUDY" });
        break;
      case "Rain":
        this.setState({ icon: "RAIN" });
        break;
      case "Snow":
        this.setState({ icon: "SNOW" });
        break;
      case "Dust":
        this.setState({ icon: "WIND" });
        break;
      case "Drizzle":
        this.setState({ icon: "SLEET" });
        break;
      case "Fog":
        this.setState({ icon: "FOG" });
        break;
      case "Smoke":
        this.setState({ icon: "FOG" });
        break;
      case "Tornado":
        this.setState({ icon: "WIND" });
        break;
      default:
        this.setState({ icon: "CLEAR_DAY" });
    }
  };

  getPosition = (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  render() {
    if (this.state.temperatureC !== undefined) {
      return (
        <React.Fragment className="container">
          <div className="front-screen">
            <div className="logo">
              <h1>Fore.cloud</h1>
            </div>
            <div className="data-box">
              <div className="temperature">
                <h1>{this.state.temperatureC}°</h1>
              </div>
              <div className="place">
                <div className="city">
                  <p>
                    {this.state.city}, {this.state.country}
                  </p>
                </div>
                <div className="date">
                  <p>
                    {<Clock format="HH:mm" interval={1000} ticking={true} />}-
                    {dateFormatter(new Date())}
                  </p>
                </div>
              </div>
              <div className="symbol">
                <ReactAnimatedWeather
                  icon={this.state.icon}
                  color={defaults.color}
                  size={defaults.size}
                  animate={defaults.animate}
                />
              </div>
            </div>
          </div>
          <div className="side-screen">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search any city"
                onChange={(e) => this.setState({ query: e.target.value })}
              />
              <button onClick={this.getCityWeather}>
                <img src={logo} />
              </button>
            </div>

            <div className="details">
              <h1>Weather Details</h1>
              <div className="det-items">
                <span>visibility</span>
                <span>{this.state.visibility} mi</span>
              </div>
              <div className="det-items">
                <span>Humidity</span>
                <span>{this.state.humidity}%</span>
              </div>
              <div className="det-items">
                <span>Temperature</span>
                <span>{this.state.temperatureC}°</span>
              </div>
              <div className="det-items">
                <span>wind Speed</span>
                <span>{this.state.windSpeed} Km/h</span>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment className="loading-container">
          <div className="loader">
            <img src={loader} alt="loading symbol" />
            <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
              Detecting your location
            </h3>
            <h3 style={{ color: "white", marginTop: "10px" }}>
              Your current location wil be displayed on the App <br></br> & used
              for calculating Real time weather.
            </h3>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Weather;
