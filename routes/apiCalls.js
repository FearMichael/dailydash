const axios = require("axios");

const apiCall = {

  weather: (zipCode) => {
    let locationSearch = `http://dataservice.accuweather.com/locations/v1/cities/{countryCode}/search?apikey=${process.env.WEATHER}&q=${zipCode}`;
    let locationID;
    axios.get(locationSearch).then(function(response) {
      locationID = response[0].ParentCity.Key;
      let weatherSearch = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationID}?apikey=${process.env.WEATHER}`
      // will need to format data and have front end render some graphics/icons based on what the weather is
      axios.get(weatherSearch).then(function(weatherInfo) {
        return weatherInfo;
      });
    });
  },

  news: () => {

  },

  stocks: () => {

  },

  calendar: () => {

  }

};

module.exports = apiCall;