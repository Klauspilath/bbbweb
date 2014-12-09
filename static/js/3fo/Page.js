$(function () {

    if (typeof TFO === 'undefined') {
        TFO = {};
    }

    TFO.__PageInstance = function () {

        this.isMobileAdapted = false;
        this.isDesktopAdapted = false;
        this.initializeResizeListener();

    };

    TFO.__PageInstance.prototype.initializeResizeListener = function () {
        $(window).resize(function () {
            TFO.Page.setHeroImageHeight();
            TFO.Page.formatNavigation();
        });
    };

    TFO.__PageInstance.prototype.setHeroImageHeight = function () {
        var hero = $('#hero-image'),
            title = $('.page-title'),
            nav = $('nav'),
            header = $('header');

        hero.css('height', $(window).height()
            - ( title.height()
            + nav.height()
            + header.height())
        );
    };

    TFO.__PageInstance.prototype.setNavigationEvents = function () {
        var $dropdowns = $('li.dropdown');

        // Mouseenter (used with .hover()) does not trigger when user enters from outside document window

        $dropdowns.on('mouseenter', function () {
            var sc = $('#screen');
            var bg = $(this).children('.nav-background');
            if (sc.offset().left == bg.offset().left) return;
            var bgl = sc.offset().left - bg.offset().left;
            bg.css('left', bgl + 'px');
        })
    };

    TFO.__PageInstance.prototype.formatNavigation = function () {

        if ($(window).width() <= 768 && !TFO.Page.isMobileAdapted) {
            TFO.Page.setMobileNavigation();
        }

        if ($(window).width() >= 769 && !TFO.Page.isDesktopAdapted) {
            TFO.Page.setDesktopNavigation()
        }

    };

    TFO.__PageInstance.prototype.setMobileNavigation = function () {

        var menuButton = $('.navbar-header > button'),
            clickedClass = 'clicked';

        menuButton.on('click', function (event) {

            if (event.isDefaultPrevented())
                return;

            event.preventDefault();
            event.stopPropagation();

            $('#main-menu-dropdown').slideToggle();

            menuButton.toggleClass(clickedClass);

            if (menuButton.hasClass(clickedClass) && $('.navbar-menu-text').css('color') !== '#bb281f') {
                $('.icon-bar').css('background-color', '#bb281f');
                $('.navbar-menu-text').css('color', '#bb281f');
            } else {
                $('.icon-bar').css('background-color', '#ffffff');
                $('.navbar-menu-text').css('color', '#ffffff');
                menuButton.removeClass(clickedClass);
            }
        });

        $('#main-menu-dropdown').append($('#bottom-menu'));
        $('.navbar-menu-text').removeClass('vanish');
        TFO.Page.isMobileAdapted = true;
        TFO.Page.isDesktopAdapted = false;
        return true;

    };

    TFO.__PageInstance.prototype.setDesktopNavigation = function () {
        if ($('#desktop-footer').children('#bottom-menu').length == 0) {
            var bottomMenu = $('#bottom-menu');
            bottomMenu.detach();
            $('#desktop-footer').append(bottomMenu);
        }

        $('.navbar-menu-text').addClass('vanish');
        TFO.Page.isMobileAdapted = false;
        TFO.Page.isDesktopAdapted = true;
        return true;
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

    TFO.Page.setNavigationEvents();
    TFO.Page.formatNavigation();
});
