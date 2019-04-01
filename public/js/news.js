//Test news.js
$(document).ready(function() {
    $("#news").on("click", function() {
        $(".card").css("width","100%");
        $(".news").hide()
        $.post("/api/news", {news: $(".news_lookup").val()}, function(data) {
            console.log(data);
        })
    })
});