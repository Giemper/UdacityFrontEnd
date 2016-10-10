$("#clicker").click(function () {
    cat[cat.length] = new Cat(cat.length);
});

$("#admin").click(function () {
    $("#admin-menu").toggleClass("admin-toggle");
});

$("#admin-cancel").click(function () {
    cat[current].getCat(current);
    $("#admin-menu").toggleClass("admin-toggle");
});

$("#admin-save").click(function () {
    cat[current].updateCat(current);
    cat[current].Render(current);
    $("#admin-menu").toggleClass("admin-toggle");
});

$("#pets").click(function() {
    if($('#pets').prop('title') === "hidden") {
        $("#leftline").toggleClass("size");
        $('#pets').prop('title', 'visible');
    }
    else {
        $("#leftline").toggleClass("size");
        $('#pets').prop('title', 'hidden');
    }
});