// $(document).ready(function() {
//     $("#stock").on("click", function() {
//         $(".card-body").css("display","block");
//         $(".stock").hide();
//         // $("#stock").hide();
//         // $(".card").css("display", "block");
//         $.post("/stocks", {}, function(data) {
//             addNews.empty();
//             addNews = $(".n");
//             $(".stock_lookup").hide();
//             for (var i = 0; i < 5; i++) {
//                 addNews.append("<strong>" + data.articles[i].title + "</strong><br>");
//                 addNews.append("<a href='" + data.articles[i].url + "'>" + data.articles[i].source.name + "</a><hr>");
//             }
//         });
//     });

// });

$("#stock").on("click", function() {
    let symbol = $(".quote_lookup").val();
    $.post("/stocks", {stock: symbol}, function(stocks) {
        console.log(stocks);
        $("#stockText").empty();
        $(".quote_lookup").empty();
        let stockSymbol = $("<h5>").text(`Symbol: ${stocks[0].symbol}`);
        let stockPrice = $("<p>").text(`Price: $${stocks[0].regularMarketPrice}`);
        let stockName = $("<h4>").text(stocks[0].shortName);
        let stockTime = $("<p>").text(`Market Time: ${moment.unix(stocks[0].regularMarketTime).format("dddd, MMMM Do YYYY, h:mm a")}`);
        $("#stockText").append(stockSymbol, stockName, stockPrice, stockTime);
    });
});