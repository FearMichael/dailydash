$(document).ready(function() {
    $("#stock").on("click", function() {
        $(".card-body").css("display","block");
        $(".stock").hide();
        $("#stock").hide();
        // $(".card").css("display", "block");
        $.get("/stocks", function(data) {
            addNews = $(".n");
            addNews.empty();
            $(".stock_lookup").hide();
            for (var i = 0; i < 5; i++) {
                addNews.append("<strong>" + data.articles[i].title + "</strong><br>");
                addNews.append("<a href='" + data.articles[i].url + "'>" + data.articles[i].source.name + "</a><hr>");
            }
        });
    });

});
console.log("Stocks reached");

$("#stock").on("click", function() {
    let symbol = $("quote_lookup").val()
    $.post("/stocks", {stock: symbol}, function(stocks) {
        console.log(stocks);
        $("#stockInfo").empty();

        stocks.result.forEach(function(){
            $("#stock").append(`Symbol: ${quoteResponse.result[0].symbol}
            `)
                .append (`Price: ${quoteResponse.result[0].regularMarketPrice}
            `)
                .append (`Time: ${quoteResponse.result[0].regularMarketTime}
            `);
        });
    });
});