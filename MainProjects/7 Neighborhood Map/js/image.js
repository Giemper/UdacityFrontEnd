var apiKey = 'AIzaSyBxtyZmUFKCzNYxAy2VUBQ12qhHK_mw0-g';
var apiKey2 = 'AIzaSyCcWbFVfs728cl5u6WM4itf-A6hCRDgGB4';
var cseID = '002919751662395594107:hetlad5jjpe';

function getImage (query, api) {
    var title = query;
    var repeat = false;
    var imgURL;
    var snippet;

    var gImage =  'https://www.googleapis.com/customsearch/v1';
    gImage += '?' + $.param({
        'q': 'Station ' + query + ' Montreal',
        'cx': cseID,
        'fileType': 'png jpg',
        'imgSize': 'large',
        'imgType': 'photo',
        'num': '1',
        'searchType': 'image',
        'key': api
    });

    
    $.getJSON(gImage, function (data) {
        imgURL = data.items[0].link;
        snippet = data.items[0].snippet;
    }).fail(function () {
        if(api === apiKey){
            console.log("Second Key used");
            repeat = true;
            getImage(query, apiKey2);
        }
        else {
            repeat = false;
            imgURL = 'img/flip.png';
            snippet = 'There should be a pretty picture here..';
        }
    }).always(function() {
        var content = '<article>' + 
        '<h3>' + title + '</h3><figure style="margin:0; padding:0;"><a href="' + imgURL + '" target="_blank">' + 
        '<img src="'+ imgURL +'" style="max-width: 280px" onerror="imgFail(this)"></a>' +
        '<figcaption style="max-width:280px">' + snippet + '</figcaption>' + 
        '<figcaption style="max-width:280px; font-size:9px;">' +
        '<a href="https://www.google.com/imghp" style="color: #949aa3; text-decoration:none" target="_blank">' + 
        'Source: Google Image Search</a></figcaption>' + '</figure>' +
        '</article>';
        if(repeat === false)
            infoWindow.setContent(content);
    });
}

function imgFail (image) {
    image.onerror="";
    image.src = "img/shrug.png";
    return true;
}