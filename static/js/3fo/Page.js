$(function () {

    if (typeof TFO === 'undefined') {
        TFO = {};
    }

    TFO.__PageInstance = function () {
        this.initializeResizeListener();
        this.setNavigationEvents();
    };

    TFO.__PageInstance.prototype.initializeResizeListener = function () {
        $(window).resize(function () {
            TFO.Page.setHeroImageHeight()
        });
    };

    TFO.__PageInstance.prototype.setHeroImageHeight = function () {
        var hero = $("#hero-image"),
            title = $(".page-title"),
            nav = $("nav"),
            header = $("header");

        hero.css("height", $(window).height()
                - (title.height()
                    + nav.height()
                    + header.height())
        );
    };

    TFO.__PageInstance.prototype.setNavigationEvents = function () {
        var $dropdowns = $('li.dropdown');

        // Mouseenter (used with .hover()) does not trigger when user enters from outside document window

        $dropdowns.on('mouseenter', function () {
            var sc = $('#screen');
            var bg = $(this).children(".nav-background");
            if (sc.offset().left == bg.offset().left) return;
            var bgl = sc.offset().left - bg.offset().left;
            bg.css("left", bgl + "px");
        })
    };

    TFO.__PageInstance.prototype.getState = function () {
        return this.state;
    };

    TFO.__PageInstance.prototype.setState = function (state) {
        this.state = state;
    };

    TFO.Page = new TFO.__PageInstance();
    if (!TFO.globals.constants.IS_HOME) {
        $(window).trigger('resize');
    }
});
