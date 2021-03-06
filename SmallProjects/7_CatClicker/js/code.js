var count = [];
var cat = [];
var current = 0;
var resources = {
    cat_repo : [
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
    hello : [
        'Hi', 'Hello', 'Howdy', 'Konichiwa',
        'Hola', 'Sup', 'Hey', 'Bonjour', 'Wadsup',
        'Oii Mate', 'Ahoy', "Hai", "Greetings",
        'How\'s it going', 'How you doin\''
    ],
    first_name : [
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
    last_name : [
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
    this.id = "cat" + id;
    this.src = resources.cat_repo[Random(resources.cat_repo.length)];
    this.greeting = resources.hello[Random(resources.hello.length)];
    this.full_name = resources.first_name[Random(resources.first_name.length)] + " " + 
        resources.last_name[Random(resources.last_name.length)];
    this.canvas = $("#cat-canvas")[0];
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "24pt Impact";
    this.ctx.lineWidth = 5;
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.stokeStyle = "black";
    
    $("#counter").text("Counter: " + (count[id] = 0));
    this.setCat(id);
    this.getCat(id);
    this.Render(id);

    $("#cat-canvas").on("click", function () {
        if ($('#cat-canvas').prop('title') === "cat" + id) {
            count[id]++;
            $("#counter").text("Counter: " + count[id]);
            $("#admin-counter").val(count[id]);

            cat[id].levelCat(id);
        }
    });
};

Cat.prototype.levelCat = function (id) {
    if(count[id] < 20)
        $("#cat-state").text("Baby Kitty");
    else if(count[id] < 50)
        $("#cat-state").text("Infant Kitty");
    else if(count[id] < 100)
        $("#cat-state").text("Child Kitty");
    else if(count[id] < 500)
        $("#cat-state").text("Teen Cat");
    else if(count[id] < 1000)
        $("#cat-state").text("Adult Cat");
    else
        $("#cat-state").text("Ninja Lion");
}

Cat.prototype.Render = function (id) {
    var img = new Image();
    var phrase = this.greeting + ", I'm " +this.full_name;
    var canvas = this.canvas;
    var ctx = this.ctx;

    img.src = this.src;
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.strokeText((phrase).toUpperCase(), canvas.width / 2, 50);
        ctx.fillText((phrase).toUpperCase(), canvas.width / 2, 50);
    }

    $("#cat-title").text(this.full_name);
    $("#counter").text("Counter: " + count[id]);
        
}

Cat.prototype.setCat = function(id) {
    $("#cat-list").append('<li class="no-highlight cat-pick" id="' + this.id + '"><a id="a-'+this.id+'">' + this.full_name + '</a></li>');
    $('#cat-canvas').prop('title', this.id);
    this.levelCat(id);
    current = id;

    $(".cat-pick").last().on("click", function () {
        current = id;
        $('#cat-canvas').prop('title', cat[id].id);
        cat[id].getCat(id);
        cat[id].Render(id);
        cat[id].levelCat(id);
    });
}

Cat.prototype.getCat = function(id) {
    $("#admin-name").val(this.full_name);
    $("#admin-url").val(this.src);
    $("#admin-counter").val(count[id]);
}

Cat.prototype.updateCat = function(id) {
    this.full_name = $("#admin-name").val();
    this.src = $("#admin-url").val();
    count[id] = parseInt($("#admin-counter").val());
    $("#a-"+this.id).text(this.full_name);
    this.levelCat(id);
}

cat[cat.length] = new Cat(cat.length);