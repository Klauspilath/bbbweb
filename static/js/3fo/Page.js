$(function () {

	if (typeof TFO === 'undefined') {
		TFO = {};
	}

	TFO.__PageInstance = function () {

	};

	TFO.__PageInstance.STATIC_IMG_PATH = '/static/img/';
	TFO.__PageInstance.FIXED_NAVIGATION_SELECTOR = '.fix';
	TFO.__PageInstance.CLICK_TOGGLE_SELECTOR = 'clicked';
	TFO.__PageInstance.PHONE_LINK_SELECTOR = '.dial-out';
	TFO.__PageInstance.PHONE_NUMBER = '415-421-4222';
;
	TFO.__PageInstance.prototype.init = function () {

		this.isMobileAdapted = false;
		this.isDesktopAdapted = false;
		this.setMobileMenuListeners();
		this.setImageMouseovers();
		this.initializeResizeListener();
		this.formatNavigation();
	};

	TFO.__PageInstance.prototype.mobileElements = ['.navbar-header', '#mobile-menu-dropdown', 'header'];


	TFO.__PageInstance.prototype.initializeResizeListener = function () {
		$(window).resize(function () {
			TFO.Page.setHeroImageHeight();
			TFO.Page.formatNavigation();
		});
	};

	TFO.__PageInstance.prototype.setImageMouseovers = function () {
		var fb = document.getElementById('fb-icon'),
			twitter = document.getElementById('twitter-icon'),
			youtube = document.getElementById('youtube-icon'),
			elements = [fb, twitter, youtube];

		elements.forEach(function(element) {
			$(element).on('mouseover', function (event) {
				event.currentTarget.src = TFO.__PageInstance.STATIC_IMG_PATH + $(element).attr('id') + '-hover.png';
			});

			$(element).on('mouseout', function (event) {
				event.currentTarget.src = TFO.__PageInstance.STATIC_IMG_PATH + $(element).attr('id') + '.png';
			});
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

	TFO.__PageInstance.prototype.setNavigationEvents = function (listEvents) {
		var $dropdowns = $('li.dropdown'), i = 0;

		for (i; i < listEvents.length; i++) {
			$dropdowns.on(listEvents[i], function (event) {
				var sc = $('#screen'),
					bg = $(this).children('.nav-background');

				if (sc.offset().left == bg.offset().left) return;
				var bgl = sc.offset().left - bg.offset().left;
				bg.css('left', -1 * ($(this).offset().left) + sc.offset().left);
			});
		}
	};

	TFO.__PageInstance.prototype.formatNavigation = function () {

		var mql = window.matchMedia("(orientation: portrait)");
		TFO.Page.setNavigationEvents(['mouseenter', 'touchstart', 'touchmove']);

		if (($(window).width() <= 768 || mql.matches) && !TFO.Page.isMobileAdapted) {
			TFO.Page.formatMobileNavigation();
		}

		if ($(window).width() >= 769 && !TFO.Page.isDesktopAdapted) {
			TFO.Page.formatDesktopNavigation();
		}
	};

	TFO.__PageInstance.prototype.formatMobileNavigation = function () {

		var mobileMenu = $('#mobile-menu-dropdown');
		var socialLinks = $('#social-links');

		socialLinks.detach();
		mobileMenu.append($('#bottom-menu'));
		mobileMenu.removeClass('vanish');

		$('.nav-footer').append(socialLinks);
		$('#main-menu-dropdown').addClass('vanish');
		$('.navbar-menu-text').removeClass('vanish');
		$('#footer-box-office').removeClass('vanish');

		TFO.Page.isMobileAdapted = true;
		TFO.Page.isDesktopAdapted = false;

		if(TFO.globals.constants.IS_MOBILE)
			TFO.Page.updateTicketLinksForMobile();
	};

	TFO.__PageInstance.prototype.updateTicketLinksForMobile = function(){
		var links = $(TFO.__PageInstance.PHONE_LINK_SELECTOR);
		links.attr('href','tel:' + TFO.__PageInstance.PHONE_NUMBER);
		links.removeAttr('target');
	};

	TFO.__PageInstance.prototype.formatDesktopNavigation = function () {
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

	TFO.__PageInstance.prototype.setFixedMobileNavigation = function () {
		var i = 0;

		for (i; i < this.mobileElements.length; i++) {
			var selector = this.mobileElements[i];
			$(selector).addClass('fix');
		}
	};

	TFO.__PageInstance.prototype.clearFixedMobileNavigation = function () {
		var i = 0;

		for (i; i < this.mobileElements.length; i++) {
			var selector = this.mobileElements[i];
			$(selector).removeClass('fix');
		}
	};

	TFO.__PageInstance.prototype.setMobileMenuListeners = function () {
		this.setMobileClickListener();
		this.setMobileScrollListener();
	};

	TFO.__PageInstance.prototype.setMobileScrollListener = function () {
		$(window).scroll(
			function () {
				if ($(window).scrollTop() >= $('#themenu').position().top) {
					TFO.Page.setFixedMobileNavigation();
				} else {
					TFO.Page.clearFixedMobileNavigation();
				}
			}
		);
	};

	TFO.__PageInstance.prototype.setMobileClickListener = function () {

		$('.navbar-header > button').on('click', function (event) {

			if (event.isDefaultPrevented())
				return;

			var navMenuText = $('.navbar-menu-text'),
				menuButton = $('#mobile-menu-button');

			event.preventDefault();
			event.stopPropagation();

			$('#mobile-menu-dropdown').slideToggle(function () {
				$(window).trigger('scroll');
			});

			if (menuButton.attr('data-clicked') === 'false') {
				$('.icon-bar').css('background-color', '#bb281f');
				navMenuText.css('color', '#bb281f');
				menuButton.attr('data-clicked', 'true');

			} else {
				$('.icon-bar').css('background-color', '#ffffff');
				navMenuText.css('color', '#ffffff');
				menuButton.attr('data-clicked', 'false');
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

	$(window).load(function () {
		$(window).trigger('resize');
	});

});
