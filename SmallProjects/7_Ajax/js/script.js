var street;
var city;
$('body').append('<img class="bgimg">');

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    street = $('#street').val();
    city = $('#city').val();
    var maps = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + street + ', ' + city;
    $('.bgimg').attr("src", maps);

    // Load New York Times
    var nyURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    nyURL += '?' + $.param({
        'api-key': "225ff523fac24045a220629eb0a2a942",
        'q': city,
        'sort': "newest"
    });
    $.getJSON(nyURL, function (data) {
        $nytHeaderElem.text('New York Times Articles About ' + city);

        var articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href="' + article.web_url + '">' +
                article.headline.main + '</a>' +
                '<p>' + article.snippet + '</p>' + '</li>');
        }
    })
        .error(function () {
            $nytHeaderElem.text('New York Times Articles Could Not Be Found');
        });

    // Load wikipedia
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +
    city + '&format=jscon&callback=wikiCallback';

    var wikiRequestTimeout = setTimeout(function () {
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function (response) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                var articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            }
            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);