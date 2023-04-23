import clear from "../images/weather-icons/clear.png";
import overcast from "../images/weather-icons/overcast.png";
import rain from "../images/weather-icons/rain.png";
import snow from "../images/weather-icons/snow.png";
import snowfall from "../images/weather-icons/snowfall.png";
import thunderstorm from "../images/weather-icons/thunderstorm.png";

const WEATHER_CODES = {
  0: {
    text: "Clear",
    img: clear,
  },
  1: {
    text: "Mainly Clear",
    img: clear,
  },
  2: {
    text: "Party Clear",
    img: clear,
  },
  3: {
    text: "Overcast",
    img: overcast,
  },
  45: {
    text: "Fog",
    img: overcast,
  },
  48: {
    text: "Depositing Rime Fog",
    img: overcast,
  },
  51: {
    text: "Light Drizzle",
    img: rain,
  },
  53: {
    text: "Moderate Drizzle",
    img: rain,
  },
  55: {
    text: "Dense Drizzle",
    img: rain,
  },
  56: {
    text: "Light Freezing Drizzle",
    img: "snow.png",
  },
  57: {
    text: "Dense Freezing Drizzle",
    img: "snow.png",
  },
  61: {
    text: "Slight Rain",
    img: rain,
  },
  63: {
    text: "Moderate Rain",
    img: rain,
  },
  65: {
    text: "Heavy Rain",
    img: rain,
  },
  66: {
    text: "Light Freezing Rain",
    img: snow,
  },
  67: {
    text: "Heavy Freezing Rain",
    img: snow,
  },
  71: {
    text: "Slight Snowfall",
    img: snowfall,
  },
  73: {
    text: "Moderate Snowfall",
    img: snowfall,
  },
  75: {
    text: "Heavy Snowfall",
    img: snowfall,
  },
  77: {
    text: "Snow grains",
    img: snowfall,
  },
  80: {
    text: "Slight Rain Showers",
    img: rain,
  },
  81: {
    text: "Moderate Rain Showers",
    img: rain,
  },
  82: {
    text: "Violent Rain Showers",
    img: rain,
  },
  85: {
    text: "Slight Snow Showers",
    img: snow,
  },
  86: {
    text: "Heavy Snow Showers",
    img: snow,
  },
  95: {
    text: "Thunderstorm",
    img: thunderstorm,
  },
  96: {
    text: "Thunderstorm With Slight Hail",
    img: thunderstorm,
  },
  99: {
    text: "Thunderstorm With Heavy Hail",
    img: thunderstorm,
  },
};

export default WEATHER_CODES;
