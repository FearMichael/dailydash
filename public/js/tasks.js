const user = $("#user").attr("data");

function renderTodos(list) {
    $("#to-dos").empty();

    for (var i= 0; i < list.length; i++) {  
        var toDoItem = $("<p>");
        toDoItem.text(list[i]);
    }

    var toDoClose = $("<button>");

    toDoClose.attr("data-to-do", i);
    toDoClose.addClass("checkbox");
    toDoClose.text("");

    toDoItem = toDoItem.prepend(toDoClose);

    $("#to-dos").append(toDoItem);

}

$("#add-to-do").on("click", function(event) {
    event.preventDefault();

    var toDoTask = $("#to-do").val().trim();
    $.post("/addtasks", {user: user, task: toDoTask}, function(task) {
        console.log(task);
    }).then(function() {
        $.get("/gettasks", function(taskData) {
            renderTodos(taskData);
        });
    });

    // list.push(toDoTask);

    // renderTodos(list);

    // localStorage.setItem("todolist"), JSON.stringify(list);

    // $("#to-do").val("");

});

// $(document).on("click", ".checkbox", function() {

//     var toDoNumber = $(this).attr("data-to-do");

//     list.splice(toDoNumber, 1);

//     renderTodos(list);

//     localStorage.setItem("todolist", JSON.stringify(list));

// });

// var list = JSON.parse(localStorage.getItem("todolist"));


// if (!Array.isArray(list)) {
//     list = [];
// }

renderTodos(list);
