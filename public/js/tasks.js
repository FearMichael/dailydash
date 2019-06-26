const userId = $("#user").attr("data");

function renderTodos(list) {
    $("#to-dos").empty();

    list.forEach(function(elem) {
        let newDiv = $("<div>");
        let newItem = $("<h5>");
        let newButton = $("<button>");
        newItem.text(elem.text);
        newItem.attr("data", elem.id).addClass("toDoItem");
        newButton.attr("data", elem.id).addClass("toDoItem btn btn-sm btn-info mx-2").text("Done!");
        newDiv.append(newItem, newButton);
        $("#to-dos").append(newDiv);
    });
}

$("#add-to-do").on("click", function(event) {
    event.preventDefault();
    var toDoTask = $("#to-do").val().trim();
    if (toDoTask && userId) {
        $.post("/addtasks", {user: userId, task: toDoTask}, function(task) {
            console.log(task);
            renderTodos(task);
        });
    } else {
        $("#notification").modal("show");
    }
});

$(document).ready(function() {
    if (userId) {
        $.post("/gettasks", {user: userId}, function(data) {
            renderTodos(data);
        });
    }
});
  
$(document).on("click", ".toDoItem", function(event) {
    selectedId = $(this).attr("data");
    console.log($(`h5[data=${selectedId}]`));
    let deleteText = $(`h5[data=${selectedId}]`).text();
    $("#deleteItem").text(`" ${deleteText} "`);
    $("#confirmDelete").modal("show");

    $(document).on("click", "#confirm", function(event) {
        console.log("deleted");
        $.post("/deletetask", {id: selectedId} );
        $(`.toDoItem[data=${selectedId}]`).remove();
        // $(`h5[data=${selectedId}]`).remove()
        $("#confirmDelete").modal("hide");
    });
});