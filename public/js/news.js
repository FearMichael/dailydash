// const moment = require("moment");
$(document).ready(function () {
    let expand = $(".expand");
    let minimize = $(".mini");
    expand.hide();
    minimize.hide();
    $("#news").on("click", function () {
        var newsLookup = $(".news_lookup").val().trim();
        if (newsLookup) {
            $(".news").hide();
            expand.show().css("margin-bottom", "-5%");
            $.post("/news", {
                news: newsLookup
            }, function (data) {
                addNews = $(".n");
                addNews.empty();
                $(".scroll").css("max-height", "600px").css("overflow-y", "auto")
                for (var i = 0; i < data.articles.length; i++) {
                    addNews.append("<strong><a href='" + data.articles[i].url + "'>" + data.articles[i].title + "</a></strong><br>");
                    addNews.append("<img src='" + data.articles[i].urlToImage + "'id='data-img' class='mb-3'>");
                    addNews.append(data.articles[i].description + "<hr>");
                }
            });
        } else {
            $(".news_lookup").attr("placeholder", "Please Enter a Topic").addClass("lookupBox");
        }
    });

});

$("#weather").on("click", function () {
    let zipCode = $(".weather_lookup").val();
    IsValidZipCode(zipCode);
    $.post("/weather", {
        zip: zipCode
    }, function (weatherInfo) {
        console.log(weatherInfo);
        $(".weather-img").css("float", "right").css("height", "200px").css("width", "100%");
        let weather = $("#weatherText");
        weather.empty();
        weather.append("<strong><u>5 Day Forecast</u></strong><br>");
        weatherInfo.DailyForecasts.forEach(function (elem) {
            // var day = moment(elem.Date).format("dddd");
            weather.append(`<strong>${elem.Date}</strong><br>`)
                .append(`<strong>Day:</strong> ${elem.Day.IconPhrase}
              |  `)
                .append(`<strong>Night:</strong> ${elem.Night.IconPhrase}
              |  `)
                .append(`  <strong>High:</strong> ${elem.Temperature.Maximum.Value} ${elem.Temperature.Minimum.Unit}  <strong>Low:</strong> 
                ${elem.Temperature.Minimum.Value} ${elem.Temperature.Minimum.Unit}<br><hr>`);
        });
    });
});

$("#stock").on("click", function () {
    let stock = $(".quote_lookup");
    $.post("/stocks", {
        ticker: stock.val().trim()
    }, function (stockInfo) {
        console.log(stockInfo)
        let stocks = $("stockText");
        stocks.empty();
    });
});

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
    var isValid = /^[0-9]{5}?$/.test(zip);
    if (!isValid) {
        $(".weather_lookup").attr("placeholder", "Zip Code").addClass("lookupBox");
    }
}