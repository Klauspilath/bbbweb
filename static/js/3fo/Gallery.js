$(function () {

	if (typeof TFO === 'undefined') {
		TFO = {};
	}

	TFO.__GalleryInstance = function () {
		this.initializeResizeListener();
		this.initializeSlideListener();
	};

	TFO.__GalleryInstance.prototype.THUMBNAIL_WIDTH = 200;
	TFO.__GalleryInstance.prototype.SCREEN_WIDTH = 1000;
	TFO.__GalleryInstance.prototype.MOBILE_MEDIUM_WIDTH = 768;
	TFO.__GalleryInstance.prototype.MOBILE_SMALL_WIDTH = 640;
	TFO.__GalleryInstance.prototype.MAX_THUMBS_PER_SLIDE = 5;
	TFO.__GalleryInstance.prototype.MEDIUM_THUMBS_PER_SLIDE = 4;
	TFO.__GalleryInstance.prototype.SMALL_THUMBS_PER_SLIDE = 3;

	TFO.__GalleryInstance.prototype.initializeResizeListener = function () {

		$(window).resize(function () {

			var t = $(this), s = $('#screen'), i = $('.thumbnail > img');
			var g = TFO.Gallery;
			var tw = t.width();
			var sw = s.width();

			if (tw < g.SCREEN_WIDTH && tw > g.MOBILE_MEDIUM_WIDTH) {
				// ResponsiveWidth = ThumbWidth(WindowWidth/ScreenWidth)
				// this should always be MAX_THUMBS_PER_SLIDE.
				i.css('width', g.THUMBNAIL_WIDTH * (tw / g.SCREEN_WIDTH) + 'px');

			} else if (sw < g.MOBILE_MEDIUM_WIDTH && sw > g.MOBILE_SMALL_WIDTH) {
				// 4 for tablets
				i.css('width', sw / g.MEDIUM_THUMBS_PER_SLIDE + 'px');

			} else if (tw < g.MOBILE_SMALL_WIDTH) {
				// 3 for mobile
				i.css('width', sw / g.SMALL_THUMBS_PER_SLIDE + 'px');

			} else {
				i.css('width', g.THUMBNAIL_WIDTH + 'px');
			}
		});
	};

	TFO.__GalleryInstance.prototype.initializeThumbnailListeners = function () {

		// for each item in the thumbnail list, check the modulo on the first and
		// last items of each section.
		// first items move the thumbnail slides to the right. first items are always
		// the start of each section.
		// if %N == 0, %N - 1 receives a listener to move the slider to the left,
		// only if there are items in the previous section.
		// %N will only move the slider to the left if there is a remainder of items
		// to the right of the current section.
		var g = TFO.Gallery;
		var thumbImages = $('.thumb-image .thumbnail');

		thumbImages.each(function(index){
			var g = TFO.Gallery;

			if(!Boolean(index%g.MAX_THUMBS_PER_SLIDE) ){

				//console.log(index + ":" + index % g.MAX_THUMBS_PER_SLIDE + '=' + Boolean(index% g.MAX_THUMBS_PER_SLIDE ));
				console.log($(this).attr('class') + " : " + index);
			}
		});




	};

	TFO.__GalleryInstance.prototype.initializeSlideListener = function () {
		var activeId = $('.item.item-div.active').attr('id');

		$('.thumbnail.' + activeId + '> img').toggleClass('semi-trans');

		// as the gallery slider moves, show the the current thumb nail
		$('#carousel-gallery').on('slide.bs.carousel', function (event) {
			var slide = event.relatedTarget;
			var direction = event.direction;
			var activeId = $('.item.item-div.active').attr('id');
			$('.thumbnail.' + activeId + '> img').toggleClass('semi-trans');
			$('.thumbnail.' + $(slide).attr('id') + '> img').toggleClass('semi-trans');
		});
	};

	TFO.__GalleryInstance.prototype.shiftThumbs = function (event) {
		// handles the movement of the thumbnail row. The row will shift in the
		// left or right based on which item in the row is clicked.
		// 1st item will move the row to the previous set (slides the to the right),
		// if one is available.
		//
		// The last item in the row will slide the next set into view. (slides to
		// the left).
		//
		// Only whole sets will move at a time. If there is an incomplete block left
		// at the end, the navigation will only slide to a position where the very
		// last image is visible in the last position.


		//shift the thumb slider to the left edge of the window or the screen element.

	};

	//create instance
	TFO.Gallery = new TFO.__GalleryInstance();
	TFO.Gallery.initializeThumbnailListeners();

});
