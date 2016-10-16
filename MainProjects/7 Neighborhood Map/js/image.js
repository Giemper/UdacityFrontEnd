// 'image.js' handles the request to the CSE API.

// To exceed the '100 query' limit of Google CSE API,
// I ended up creating two separate APIs. If one is not
// loaded, use the other one. 
// I went way over the limit while testing this app. 
// Sorry Google. I really don't want to wait a whole 
// day to test my app.
// var cseID is my Client ID
var apiKey = 'AIzaSyBxtyZmUFKCzNYxAy2VUBQ12qhHK_mw0-g';
var apiKey2 = 'AIzaSyCcWbFVfs728cl5u6WM4itf-A6hCRDgGB4';
var cseID = '002919751662395594107:hetlad5jjpe';

// getGoogle creates the query request url,
// parses through the response json,
// sets a fail callback
function getGoogle (query, api) {
    var title = query;
    var repeat = false;
    var imgURL;
    var snippet;

    //Creates the query url
    var gImage =  'https://www.googleapis.com/customsearch/v1';
    gImage += '?' + $.param({
        'q': 'Station ' + query + ' Montreal',
        'cx': cseID,
        'fileType': 'png jpg',
        'imgSize': 'xlarge',
        'imgType': 'photo',
        'num': '1',
        'searchType': 'image',
        'key': api
    });

    // If there's a JSON response, it reads the received image link
    // and a small snippet of information of said image to be
    //displayed in the marker's' infowindow.
    $.getJSON(gImage, function (data) {
        imgURL = data.items[0].link;
        snippet = data.items[0].snippet;
    })

    // fail() does two things: the first one is if 'apiKey' fails,
    // it then repeats the whole 'getImage' function, but now with 'apiKey2'.
    // Thats my sad loophole to go over the '100 query' limit of the CSE API.
    // The second goal of fail() is to assign a placeholder image if 'apiKey2'
    // fails as well.
    .fail(function () {
        if(api === apiKey){
            console.log("Second Key used");
            repeat = true;
            getGoogle(query, apiKey2);
        }
        else {
            repeat = false;
            imgURL = 'img/flip.png';
            snippet = 'There should be a pretty picture here..';
        }
    })
    
    // always() will generate the content of the infowindow either way.
    .always(function() {
        var content = 
        '<figure style="margin:0; padding:0;"><a href="' + imgURL + '" target="_blank">' + 
        '<img src="'+ imgURL +'" style="max-width: 280px" onerror="imgFail(this)"></a>' +
        '<figcaption style="max-width:280px">' + snippet + '</figcaption>' + 
        '<figcaption style="max-width:280px; font-size:9px;">' +
        '<a href="https://www.google.com/imghp" style="color: #949aa3; text-decoration:none" target="_blank">' + 
        'Source: Google Image Search</a></figcaption>' + '</figure>';
        if(repeat === false)
            return content;
            // infoWindow.setContent(content);
    });
}

// If an image pulled from Google CSE api
// is not loaded, a placeholder image will
// be shown to indicate the loading error.
function imgFail (image) {
    image.onerror="";
    image.src = "img/shrug.png";
    return true;
}