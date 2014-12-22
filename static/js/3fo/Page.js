$(function () {

    if (typeof TFO === 'undefined') {
        TFO = {};
    }

    TFO.__PageInstance = function (){

    };

    TFO.__PageInstance.STATIC_IMG_PATH = '/static/img/';

    TFO.__PageInstance.prototype.init = function () {

        this.isMobileAdapted = false;
        this.isDesktopAdapted = false;
        this.setMobileMenuListeners();
        this.setImageMouseovers();
        this.initializeResizeListener();
        this.formatNavigation();
    };

    TFO.__PageInstance.prototype.initializeResizeListener = function () {
        $(window).resize(function () {
            TFO.Page.setHeroImageHeight();
            TFO.Page.formatNavigation();
        });
    };

    TFO.__PageInstance.prototype.setImageMouseovers = function () {
        var fb = document.getElementById('fb-icon'),
            twitter = document.getElementById('twitter-icon'),
            youtube = document.getElementById('youtube-icon');

        $(fb).on('mouseover', function () {
            event.currentTarget.src = TFO.__PageInstance.STATIC_IMG_PATH + 'fb-icon-hover.png';
        });

        $(fb).on('mouseout', function () {
            event.currentTarget.src = TFO.__PageInstance.STATIC_IMG_PATH + 'fb-icon.png';
        });

        $(twitter).on('mouseover', function () {
           event.currentTarget.src = TFO.__PageInstance.STATIC_IMG_PATH + 'twitter-icon-hover.png';
        });

        $(twitter).on('mouseout', function () {
            event.currentTarget.src = TFO.__PageInstance.STATIC_IMG_PATH + 'twitter-icon.png';
        });

        $(youtube).on('mouseover', function () {
            event.currentTarget.src = TFO.__PageInstance.STATIC_IMG_PATH + 'youtube-icon-hover.png';
        });

        $(youtube).on('mouseout', function () {
            event.currentTarget.src = TFO.__PageInstance.STATIC_IMG_PATH + 'youtube-icon.png';
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

        $dropdowns.off('mouseenter');

        $dropdowns.on('mouseenter', function () {
            var sc = $('#screen'),
                bg = $(this).children('.nav-background');

            if (sc.offset().left == bg.offset().left) return;

            var bgl = sc.offset().left - bg.offset().left;
            //bg.css('left', sc.offset().left + 'px');

            bg.css('left', -1 * ($(this).offset().left) + sc.offset().left);
        })
    };

    TFO.__PageInstance.prototype.formatNavigation = function () {

        TFO.Page.setNavigationEvents();

        if ($(window).width() <= 768 && !TFO.Page.isMobileAdapted) {
            TFO.Page.setMobileNavigation();
        }

        if ($(window).width() >= 769 && !TFO.Page.isDesktopAdapted) {
            TFO.Page.setDesktopNavigation();
        }
    };

    TFO.__PageInstance.prototype.setMobileNavigation = function () {

        var mobileMenu = $('#mobile-menu-dropdown');
        var socialLinks = $('#social-links');
        socialLinks.detach();
        mobileMenu.append($('#bottom-menu'));
        mobileMenu.removeClass('vanish');
        mobileMenu.removeAttr('style');
        $('.nav-footer').append(socialLinks);
        $('#main-menu-dropdown').addClass('vanish');
        $('.navbar-menu-text').removeClass('vanish');
        $('#footer-box-office').removeClass('vanish');
        TFO.Page.isMobileAdapted = true;
        TFO.Page.isDesktopAdapted = false;

    };

    TFO.__PageInstance.prototype.setDesktopNavigation = function () {
        var deskTopFooter = $('#desktop-footer');

        if (deskTopFooter.children('#bottom-menu').length == 0) {
            var bottomMenu = $('#bottom-menu');
            var socialLinks = $('#social-links');
            socialLinks.detach();
            bottomMenu.detach();
            deskTopFooter.append(bottomMenu);
            $('#footer-right').append(socialLinks);
        }

        $('#mobile-menu-dropdown').addClass('vanish');
        $('.navbar-menu-text').addClass('vanish');
        $('#main-menu-dropdown').removeClass('vanish');
        $('#footer-box-office').addClass('vanish');
        TFO.Page.isMobileAdapted = false;
        TFO.Page.isDesktopAdapted = true;

    };

    TFO.__PageInstance.prototype.setMobileMenuListeners = function () {
        var menuButton = $('.navbar-header > button'),
            clickedClass = 'clicked';

        menuButton.on('click', function (event) {

            if (event.isDefaultPrevented())
                return;

            var navMenuText = $('.navbar-menu-text');
            event.preventDefault();
            event.stopPropagation();

            $('#mobile-menu-dropdown').slideToggle();

            menuButton.toggleClass(clickedClass);

            if (menuButton.hasClass(clickedClass) && navMenuText.css('color') !== '#bb281f') {
                $('.icon-bar').css('background-color', '#bb281f');
                navMenuText.css('color', '#bb281f');
            } else {
                $('.icon-bar').css('background-color', '#ffffff');
                navMenuText.css('color', '#ffffff');
                menuButton.removeClass(clickedClass);
            }
        });
    };


    TFO.__PageInstance.prototype.getState = function () {
        return this.state;
    };

    TFO.__PageInstance.prototype.setState = function (state) {
        this.state = state;
    };

    TFO.Page = new TFO.__PageInstance();

    TFO.Page.init();

    if (!TFO.globals.constants.IS_HOME) {
        $(window).trigger('resize');
    }

});
