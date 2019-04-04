//Test news.js
$(document).ready(function() {
    $("#news").on("click", function() {
        $(".card-body").css("display","block");
        $(".news").hide();
        $("#news").hide();
        // $(".card").css("display", "block");
        $.get("/news", function(data) {
            addNews = $(".n");
            addNews.empty();
            $(".news_lookup").hide();
            for (var i = 0; i < 5; i++) {
                addNews.append("<strong>" + data.articles[i].title + "</strong><br>");
                addNews.append("<a href='" + data.articles[i].url + "'>" + data.articles[i].source.name + "</a><hr>");
            }
        });
    });

});
console.log("News reached");
