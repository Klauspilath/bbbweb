$(function () {

    if (typeof TFO === 'undefined') {
        TFO = {};
    }

    TFO.__PageInstance = function () {
        this.mainMenuDropdown = $('#main-menu-dropdown');
        this.footerMenu = $('#bottom-menu');
        this.isMobileAdapted = false;
        this.isDesktopAdapted = false;
        this.navSeparator = $('#mobile-nav-separator');
        if (TFO.globals.constants.IS_MOBILE == true){
            this.formatNavigation();
        }
        this.initializeResizeListener();
        this.setNavigationEvents();
        this.formatNavigation();
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

        if ($(window).width() <= 768 && !this.isMobileAdapted){

            this.mainMenuDropdown.append(this.footerMenu);
            $('#mobile-nav-separator').removeClass('vanish');
            this.isMobileAdapted = true;
            this.isDesktopAdapted = false;
            return true;
        }

        if($(window).width() >= 769 && !this.isDesktopAdapted){

            if($('#desktop-footer').children('#bottom-menu').length == 0){
                this.footerMenu.detach();
                $('#desktop-footer').append(this.footerMenu);
                this.navSeparator.addClass('vanish');
            }

            this.isMobileAdapted = false;
            this.isDesktopAdapted = true;
            return true;
        }

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
