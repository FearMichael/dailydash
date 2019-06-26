
const sunSymbols = [1,2,3,4,5];
const cloudSymbols = [6,7,8,9,10,11,12,13];
const rainSymbols = [14,15,16,17,18,40,41,42,43,44];
const snowSymbols = [19,20,21,22,23,24,25,26,27,28,29]; 

// const moment = require("moment");
$(document).ready(function () {
    let expand = $(".expand");
    let minimize = $(".mini");
    // expand.hide();
    minimize.hide();
    $("#news").on("click", function () {
        var newsLookup = $(".news_lookup").val().trim();
        if (newsLookup) {
            $(".news").hide();
            expand.show().css("margin-bottom", "-5%");
            $.post("/verify", {
                news: newsLookup
            }, function (data) {
                console.log(data);
                // addNews = $(".n");
                // addNews.empty();
                // $(".scroll").css("max-height", "600px").css("overflow-y", "auto");
                // for (var i = 0; i < data.articles.length; i++) {
                //     addNews.append("<strong><a href='" + data.articles[i].url + "'>" + data.articles[i].title + "</a></strong><br>");
                //     addNews.append("<img src='" + data.articles[i].urlToImage + "'id='data-img' class='mb-3'>");
                //     addNews.append(data.articles[i].description + "<hr>");
                // }
            });
        } else {
            $(".news_lookup").attr("placeholder", "Please Enter a Topic").addClass("lookupBox");
        }
    });



    const includeCheck = (num) => {
        if (sunSymbols.includes(num)) {
            return "sun";
        } else if (rainSymbols.includes(num)) {
            return "cloud-rain";
        } else if (cloudSymbols.includes(num)) {
            return "cloud";
        } else if (snowSymbols.includes(num)) {
            return "snowflake";
        }
    };

    $("#weather").on("click", function () {
        let zipCode = $(".weather_lookup").val();
        if (IsValidZipCode(zipCode)) {
            $.post("/weather", {
                zip: zipCode
            }, function (weatherInfo) {
                console.log(weatherInfo);
                $(".weather-img").css("float", "right").css("height", "200px").css("width", "100%");
                let weather = $("#weatherText");
                weather.empty();
                weather.append("<strong><u>5 Day Forecast</u></strong><br>");
                weatherInfo.DailyForecasts.forEach(function (elem) {
                    let daySymbol = includeCheck(elem.Day.Icon);
                    let nightSymbol = includeCheck(elem.Night.Icon);
                    // console.log(daySymbol, nightSymbol);
                    let simpleDay = elem.Date.substr(0,10);
                    var day = moment(simpleDay, "YYYY-MM-DD").format("dddd, MMMM Do");
                    let dayArea = $("<div>");
                    let nightArea = $("<div>");
                    let tempArea = $("<div>");
                    weather.append(`<strong>${day}</strong><br>`);
                    dayArea.append(`<p><strong>Day:</strong></p><p> <div class="weathericons"><i class="fas fa-${daySymbol} fa-5x"></i></div> ${elem.Day.IconPhrase}</p>`);
                    nightArea.append(`<p><strong>Night:</strong> <div class="weathericons"><i class="fas fa-${nightSymbol} fa-5x"></i></div> ${elem.Night.IconPhrase}</p>`);
                    tempArea.append(`<p><strong>High:</strong>${elem.Temperature.Maximum.Value} <i class="fas fa-thermometer-half fa-5x"></i></div>
                    <p><strong>Low:</strong>${elem.Temperature.Minimum.Value} <i class="fas fa-thermometer-half fa-5x"></i></div><p><br><hr>`);
                    weather.append(dayArea, nightArea, tempArea);
                });
            });
        } else {
            $(".weather_lookup").empty();
            $(".weather_lookup").attr("placeholder", "Zip Code").addClass("lookupBox");
            $("#wrongZip").modal("show");
        };
    });

    // $("#stock").on("click", function () {
    //     let stock = $(".quote_lookup");
    //     $.post("/stocks", {
    //         ticker: stock.val().trim()
    //     }, function (stockInfo) {
    //         console.log(stockInfo)
    //         let stocks = $("stockText");
    //         stocks.empty();
    //     });
    // });

    let cardGroup = $(".card-group");
    let singleCard = $(".card");
    let cardImage = $(".card-img-top");
    let cardTitle = $("h3");
    $(".expand").on("click", function () {
        cardGroup.css("display", "block").css("margin", "5% 20%");
        cardImage.hide();
        // $(".section-two").css("margin-top", "-2%")
        singleCard.addClass("mb-3").css("border", "1px solid lightgray");
        cardTitle.css("text-align", "center").css("font-size", "48px");
        $(".expand").hide();
        $(".mini").show();
    });

    $(".mini").on("click", function () {
        cardGroup.css("display", "flex").css("margin", "0");
        cardImage.show();
        cardTitle.css("text-align", "left").css("font-size", "36px");
        singleCard.removeClass("mb-3");
        $(".mini").hide();
        $(".expand").show();
    });

    function IsValidZipCode(zip) {
        return /^[0-9]{5}?$/.test(zip);
    }
});