//Test news.js
$(document).ready(function() {
    $("#news").on("click", function() {
        $(".news").hide();
        $.get("/news", {news: $(".news_lookup").val()}, function(data) {
            console.log(data);
        });
    });
});