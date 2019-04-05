// const moment = require("moment");
$(document).ready(function() {
    $(".expand").hide();
    $(".mini").hide();
    $("#news").on("click", function() {
        var newsLookup = $(".news_lookup").val().trim();
        if (newsLookup) {
            $(".news").hide();
            $(".expand").show();
            $.post("/news", {news: $(".news_lookup").val().trim()}, function(data) {
                $(".news-header").css("text-align", "center").css("font-size", "48px");
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
            $(".news_lookup").attr("placeholder", "PLEASE ENTER A TOPIC").addClass("lookupBox");
        }
    });

});

$("#weather").on("click", function() {
    let zipCode = $(".weather_lookup").val();
    $.post("/weather", {zip: zipCode}, function(weatherInfo) {
        console.log(weatherInfo);
        $(".weather-img").css("float", "right").css("height", "200px").css("width", "100%");
        let weather = $("#weatherText");
        weather.empty();
        weather.append("<strong><u>5 Day Forecast</u></strong><br>");
        weatherInfo.DailyForecasts.forEach(function(elem) {
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

$("#stock").on("click", function() {
    let stock = $(".quote_lookup");
    $.post("/stocks", {ticker: stock.val().trim()}, function(stockInfo) {
        let stocks = $("stockText");
        stocks.empty();
    });
});

$(".expand").on("click", function() {
    $(".section-one").css("display","block");
    $(".card-group").css("margin","5% 20%");
    $(".card").addClass("mb-3").css("border", "1px solid lightgray");
    $(".expand").hide();
    $(".mini").show();
});

$(".mini").on("click", function() {
    $(".section-one").css("display","flex");
    $(".card").removeClass("mb-3")
    $(".card-group").css("margin","0");
    $(".mini").hide();
    $(".expand").show();
});