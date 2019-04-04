const axios = require("axios");
const unirest = require("unirest");

const apiCall = {

    weather: (zipCode) => {
        return new Promise(resolve => {
            let locationSearch = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${process.env.WEATHER}&q=${zipCode}`;
            let locationID;
            axios.get(locationSearch).then(function(response) {
                // console.log(response.data)
                locationID = response.data[0].ParentCity.Key;
                let weatherSearch = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationID}?apikey=${process.env.WEATHER}`;
                // will need to format data and have front end render some graphics/icons based on what the weather is
                axios.get(weatherSearch).then(function(weatherInfo) {
                    resolve(weatherInfo.data);
                });
            });
        });
    },

    news: async () => {
        let newsSearch = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS}`;
        return new Promise(resolve => {
            axios.get(newsSearch).then(function(newsInfo) {
                resolve(newsInfo.data);
            });
        });
    },

    stocks: (search) => {
        unirest.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=${search}`)
            .header("X-RapidAPI-Host", process.env.RAPIDAPI_HOST)
            .header("X-RapidAPI-Key", process.env.RAPIDAPI_KEY)
            .end(function (result) {
                console.log(result.status, result.headers, result.body);
            });
    },

    calendar: () => {

    }

};

module.exports = apiCall;