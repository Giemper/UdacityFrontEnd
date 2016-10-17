/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

    // observeFeed will be use to compare the first loaded feed
    // versus a second feed. This will be used to check that the
    // DOM is being updated when a new feed is selected.
    var observeFeed;

    describe('RSS Feeds', function() {

        it('are defined', function() {
            // Checks that allFeeds is not undefined
            expect(allFeeds).toBeDefined();

            // Checks that allFeeds' length is longer than 0
            expect(allFeeds.length > 0).toBe(true);
        });


        // For each object in allFeeds it will check that the
        // URL is defined, and that is not an empty string
        it('url is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        // For each object in allFeeds it will check that the
        // name is defined, and that is not an empty string
        it('name is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    describe('The menu', function() {

        // Checks that the body hast the menu-hidden class applied by default
        // menu-hidden class makes sure the sidebar doesn't shows up
        it('menu is hidden by default',function() {
            
            expect($("body").hasClass('menu-hidden')).toBe(true);
        });

        // Simulates a click unto the menu-icon-link class
        // procceds to check that the menu-hidden class on body was deactivated.
        it('menu is opened',function() {
            $('.menu-icon-link').click();
            expect($("body").hasClass('menu-hidden')).not.toBe(true);
        });

        // Simulates a click unto the menu-icon-link class
        // procceds to check that the menu-hidden class on body was activated.
        it('menu is closed', function() {
            $('.menu-icon-link').click();
            expect($("body").hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {

        // Loads the first feed in the allFeeds array
        // Makes sure to wait until the function has been finished. 
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Saves the current state of the element with class .feed
        // Makes sure that the number of entries is longer than 0
        it('loadFeed was loaded correctly', function() {
            observeFeed = $(".feed");
            expect($(".feed > .entry-link > .entry").length > 0).toBe(true);
        });
    });

    describe('New Feed Selection', function() {
        // currentFeed is going to be used to compare the current
        // feed to the past one.
        var currentFeed;

        // Loads the second feed in the allFeeds array
        // Makes sure to wait until the function has been finished. 
        beforeEach(function(done) {
            loadFeed(1, function() {
                done();
            });
        });

        // Saves the current state of the element with .feed
        // Compares observeFeed with currentFeed to prove that 
        // there has been a change in the displayed feed.
        it('new feed is updated', function(){
            currentFeed = $(".feed");
            expect(observeFeed === currentFeed).toBe(false);
        });
    });
}());
