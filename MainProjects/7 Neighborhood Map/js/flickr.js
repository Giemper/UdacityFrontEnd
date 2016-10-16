// 'flickr.js' handles all request to the Flickr API
var apiKey3 = '639b0c53defd4a8b746f9a34ff3fa993';

// getFlickr creates a the query request url,
// parses through the response json, removes the
// ugly unreadable header from the flickrjsonapi,
// and sets a fail callback
function getFlickr (query) {
    var title = query;
    var imgURL;
    var snippet;

    // Creates the query url
    var rest = 'https://api.flickr.com/services/rest/';
    rest += '?' + $.param({
        'method': 'flickr.photos.search',
        'text': 'Station ' + query + ' Montreal',
        'per_page': '1',
        'format': 'json',
        'api_key': apiKey3
    });

    // Because Flickr likes putting it's name before the
    // JSON format, we cannot use getJSON as it will automaticly fail.
    // In this case we just receive a text string from the Flickr server,
    // and remove the header to end up with a clean json.
    $.get(rest, function(data) {
        var response = data.substring(0, data.length - 1).replace('jsonFlickrApi(', '');
        var json = $.parseJSON(response);
        console.log(response);
        if(json.stat === 'ok' && json.photos.photo.length > 0){
            var obj = json.photos.photo[0];
            imgURL = 'http://c1.staticflickr.com/' + obj.farm + '/' + 
                obj.server + '/' + obj.id + '_' + obj.secret + '_b.jpg';
            snippet = obj.title;
        }
        else {
            imgURL = 'img/why.png';
            snippet = 'There should be a pretty picture here..';
        }
    })
    .fail(function () {
        imgURL = 'img/why.png';
        snippet = 'There should be a pretty picture here..';
    })
    .always(function () {
        var content = '<article>' + 
        '<h2>' + title + '</h2><figure style="margin:0; padding:0;"><a href="' + imgURL + '" target="_blank">' + 
        '<img src="'+ imgURL +'" style="max-width: 280px" onerror="imgFail(this)"></a>' +
        '<figcaption style="max-width:280px">' + snippet + '</figcaption>' + 
        '<figcaption style="max-width:280px; font-size:9px;">' +
        '<a href="https://www.google.com/imghp" style="color: #949aa3; text-decoration:none" target="_blank">' + 
        'Source: Flickr</a></figcaption>' + '</figure>' +
        '</article>';
        infoWindow.setContent(content);
    });
}

// If an image pulled from the Flickr API
// is not loaded, a placeholder image will
// be shown to indicate the loading error.
function imgFail (image) {
    image.onerror="";
    image.src = "img/shrug.png";
    return true;
}