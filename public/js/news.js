//Test news.js
$(document).ready(function() {
    $("#news").on("click", function() {
        $(".news").hide();
        $.get("/news", {news: $(".news_lookup").val()}, function(data) {
            console.log(data);
        });
    });

    $("#weather").on("click", function() {
        let zipCode = $(".weather_lookup").val()
        $.post("/weather", {zip: zipCode}, function(weatherInfo) {
            console.log(weatherInfo);
            $("#weatherText").empty();

            weatherInfo.DailyForecasts.forEach(function(elem) {
                $("#weatherText").append(`Day: ${elem.Day.IconPhrase}
                `)
                    .append(`Night: ${elem.Night.IconPhrase}
                `)
                    .append(`High: ${elem.Temperature.Maximum.Value}${elem.Temperature.Maximum.Unit}
                `)
                    .append(`High: ${elem.Temperature.Maximum.Value}${elem.Temperature.Minimum.Unit}
                `);
            });
        });
    });
});