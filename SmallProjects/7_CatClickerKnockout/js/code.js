var resources = {
    cat_repo: [
        'images/cat.jpg',
        'images/cat2.jpg',
        'images/cat3.jpg',
        'images/cat4.jpg',
        'images/cat5.jpg',
        'images/cat6.jpg',
        'images/cat7.jpg',
        'images/cat8.jpg',
        'images/cat9.jpg',
        'images/cat10.jpg',
        'images/cat11.jpg',
        'images/cat12.jpg'
    ],
    hello: [
        'Hi', 'Hello', 'Howdy', 'Konichiwa',
        'Hola', 'Sup', 'Hey', 'Bonjour', 'Wadsup',
        'Oii Mate', 'Ahoy', "Hai", "Greetings",
        'How\'s it going', 'How you doin\''
    ],
    first_name: [
        'Fluffy', 'Big', 'Dummy', 'Amazing', 'Good Ol\'',
        'Happy', 'Jolly', 'Funny', 'Quirky', 'Ravashing',
        'Special', 'Lady', 'Cool', 'Kitty', 'Humble',
        'Flamboyant', 'Killer', 'Rightful', 'Tenecious',
        'Racist', 'Tipsy', 'Special Agent', 'Independent',
        'Sensitive', 'Impeccable', 'Sensational', 'Wild',
        'Evil', 'Mecha', 'Clone #5', 'Sleepy', 'Philosophical',
        'Great Leader', 'Cuddly', 'Darth', 'Obnoxious', 'Rebel',
        'Commander', 'Captain', 'Chuck', 'Princess', 'Mexican'
    ],
    last_name: [
        'Cat', 'Kitty', 'Tom', 'Bobby',
        'Princess', 'Bubbles', 'Kitkat', 'Lollipop',
        'Marshmellow', 'Jellybean', 'Donut', 'Chinese Food',
        'Cupcake', 'Nougat', 'Eclair', 'Froyo', 'Gingerbread',
        'Ice Cream Sandwich', 'Honeycomb', 'Cuddles', 'Wizard',
        'Banjo', 'Taco', 'Cookie', 'Burger', 'Teacup', 'Pizza',
        'Lion', 'Robo-Cat', 'Spoon', 'Ezra', 'Kanan', 'Sabine',
        'Hera', 'Rex', 'Chopper', 'Zeb', 'Vader', 'Chuck', 'Norris'
    ]
}

function Random(length) {
    return Math.floor((Math.random() * length) + 1) - 1;
}

var Cat = function (id) {
    this.count = ko.observable(0);
    this.id = ko.observable("cat" + id);
    this.src = ko.observable(resources.cat_repo[Random(resources.cat_repo.length)]);
    this.greeting = ko.observable(resources.hello[Random(resources.hello.length)]);
    this.full_name = ko.observable(resources.first_name[Random(resources.first_name.length)] + " " +
        resources.last_name[Random(resources.last_name.length)]);
    this.canvas = $("#cat-canvas")[0];
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "24pt Impact";
    this.ctx.lineWidth = 5;
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.stokeStyle = "black";
    this.level = ko.observable();

    this.setLevel = function () {
        if (this.count() < 20)
            this.level("Baby Kitty");
        else if (this.count() < 50)
            this.level("Infant Kitty");
        else if (this.count() < 100)
            this.level("Child Kitty");
        else if (this.count() < 500)
            this.level("Teen Cat");
        else if (this.count() < 1000)
            this.level("Adult Cat");
        else
            this.level("Ninja Lion");
    }

    this.setCat = function () {
        $('#cat-canvas').prop('title', this.id());
        this.render();
        this.setLevel();
    }

    this.getCat = function () {
        $("#admin-name").val(this.full_name());
        $("#admin-url").val(this.src());
        $("#admin-counter").val(this.count());
    }

    this.catPick = function () {
        $('#cat-canvas').prop('title', this.id());
        updateCat(id);
        this.render();
    }

    this.render = function () {
        var img = new Image();
        var phrase = this.greeting() + ", I'm " + this.full_name();
        var canvas = this.canvas;
        var ctx = this.ctx;

        img.src = this.src();   
        img.onload = function () {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.strokeText((phrase).toUpperCase(), canvas.width / 2, 50);
            ctx.fillText((phrase).toUpperCase(), canvas.width / 2, 50);
        }
    }

    this.setCat();
}

var ViewModel = function () {
    this.cats = ko.observableArray([]);
    this.cats.push(new Cat(this.cats().length));
    this.currentCat = ko.observable(this.cats()[0]);

    this.catClick = function () {
        if ($('#cat-canvas').prop('title') === this.currentCat().id()) {
            this.currentCat().count(this.currentCat().count() + 1);
            this.currentCat().setLevel();
        }
    }
}

function updateCat(id) {
    vm.currentCat(vm.cats()[id]);
}

ko.applyBindings(vm = new ViewModel());