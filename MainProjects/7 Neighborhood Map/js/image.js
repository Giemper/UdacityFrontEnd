
//Investigate about 
//https://www.google.com/jsapi

    console.log("here");
google.load('search', '1');
google.setOnLoadCallback(OnLoad);
var search;

//i suggest instead of this to make keywords list so first to pick random keyword than to do search and pick random image
var keyword = 'mountains';

function OnLoad()
{
    
    console.log("there");
    search = new google.search.ImageSearch();
    search.setSearchCompleteCallback(this, searchComplete, null);
    search.execute(keyword);
}
var image;
function searchComplete()
{
    if (search.results && search.results.length > 0)
    {
        var rnd = Math.floor(Math.random() * search.results.length);

        //you will probably use jQuery and something like: $('body').css('background-image', "url('" + search.results[rnd]['url'] + "')");
        // document.body.style.backgroundImage = "url('" + search.results[rnd]['url'] + "')";
        image = "url('" + search.results[rnd]['url'] + "')";
        console.log(image);
    }
}
