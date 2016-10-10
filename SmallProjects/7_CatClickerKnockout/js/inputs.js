$("#clicker").click(function () {
    vm.cats.push(new Cat(vm.cats().length));
    updateCat(vm.cats().length - 1);
    $("#admin-menu").toggleClass("admin-toggle");
});

$("#admin").click(function () {
    vm.currentCat().getCat();
    $("#admin-menu").toggleClass("admin-toggle");
});

$("#admin-cancel").click(function () {
    $("#admin-menu").toggleClass("admin-toggle");
});

$("#admin-save").click(function () {
    vm.currentCat().full_name($("#admin-name").val());
    vm.currentCat().src($("#admin-url").val());
    vm.currentCat().count(parseInt($("#admin-counter").val()));
    vm.currentCat().render();
    vm.currentCat().setLevel();
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