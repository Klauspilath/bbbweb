$(function () {

	window.timer = null;

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
	TFO.__GalleryInstance.prototype.DIRECTION_THUMBSTRIP_FORWARD = 'left';
	TFO.__GalleryInstance.prototype.DIRECTION_THUMBSTRIP_BACK = 'right';
	TFO.__GalleryInstance.prototype.DATA_ATTRIBUTE = 'data-moves-slide';
	TFO.__GalleryInstance.prototype.currentMaxThumbs = TFO.__GalleryInstance.prototype.MAX_THUMBS_PER_SLIDE;

	TFO.__GalleryInstance.prototype.initializeResizeListener = function () {

		$(window).resize(function () {

			var t = $(this), s = $('#screen'), i = $('.thumbnail > img'),
				g = TFO.Gallery,
				tw = t.width(),
				sw = s.width();

			if (tw < g.SCREEN_WIDTH && tw > g.MOBILE_MEDIUM_WIDTH) {
				/*ResponsiveWidth = ThumbWidth(WindowWidth/ScreenWidth)
				 this should always be MAX_THUMBS_PER_SLIDE.*/
				i.css('width', g.THUMBNAIL_WIDTH * (tw / g.SCREEN_WIDTH) + 'px');
				g.currentMaxThumbs = g.MAX_THUMBS_PER_SLIDE;

			} else if (sw < g.MOBILE_MEDIUM_WIDTH && sw > g.MOBILE_SMALL_WIDTH) {
				i.css('width', sw / g.MEDIUM_THUMBS_PER_SLIDE + 'px');
				g.currentMaxThumbs = g.MEDIUM_THUMBS_PER_SLIDE;

			} else if (tw < g.MOBILE_SMALL_WIDTH) {
				i.css('width', sw / g.SMALL_THUMBS_PER_SLIDE + 'px');
				g.currentMaxThumbs = g.SMALL_THUMBS_PER_SLIDE;

			} else {
				i.css('width', g.THUMBNAIL_WIDTH + 'px');
			}

			clearTimeout(timer);
			window.timer = setTimeout(TFO.Gallery.setThumbnailListeners, 1000);
		});
	};

	TFO.__GalleryInstance.prototype.setThumbnailListeners = function () {

		var thumbImages = $('.thumb-image .thumbnail');

		thumbImages.each(function (index) {
			var g = TFO.Gallery,
				isStart = !(Boolean(index % g.currentMaxThumbs)),
				isEnd = index % g.currentMaxThumbs == (g.currentMaxThumbs - 1),
				t = $(this);

			console.log(index + " : isStart=" + isStart + ' : isEnd=' + isEnd);
			t.off('click');
			if (isStart && index != 0) {
				/*console.log(index + ":" + index % g.currentMaxThumbs + '=' + Boolean(index% g.currentMaxThumbs ));
				 console.log($(this).attr('class') + " : " + index + " : " + isStart);*/
				/*console.log($(this).attr('id'));*/
				t.attr(g.DATA_ATTRIBUTE, isStart);
				t.on('click', function () {
					g.shiftThumbs(g.DIRECTION_THUMBSTRIP_BACK, t);
				});
				return;
			}

			if (isEnd && index != (thumbImages.length -1)) {
				t.attr(g.DATA_ATTRIBUTE, isEnd);
				t.on('click', function () {
					g.shiftThumbs(g.DIRECTION_THUMBSTRIP_FORWARD, t);
				});
			}
		});
	};

	TFO.__GalleryInstance.prototype.initializeSlideListener = function () {
		var activeId = $('.item.item-div.active').attr('id');

		$('.thumbnail.' + activeId + '> img').toggleClass('semi-trans');

		// as the gallery slider moves, show the the current thumb nail
		$('#carousel-gallery').on('slide.bs.carousel', function (event) {
			var thumb = event.relatedTarget,
				direction = event.direction,
				activeId = $('.item.item-div.active').attr('id'),
				t = $(this);

			$('.thumbnail.' + activeId + '> img').toggleClass('semi-trans');
			$('.thumbnail.' + $(thumb).attr('id') + '> img').toggleClass('semi-trans');

			if (t.attr(TFO.Gallery.DATA_ATTRIBUTE) === "true") {
				TFO.Gallery.shiftThumbs(direction, thumb);
			}
		});
	};

	TFO.__GalleryInstance.prototype.shiftThumbs = function (direction, target) {
		/*
		 handles the movement of the thumbnail row. The row will shift in the
		 left or right based on which item in the row is clicked.
		 1st item will move the row to the previous set (slides the to the right),
		 if one is available.

		 The last item in the row will slide the next set into view. (slides to
		 the left).

		 Only whole sets will move at a time. If there is an incomplete block left
		 at the end, the navigation will only slide to a position where the very
		 last image is visible in the last position.

		 shift the thumb slider to the left edge of the screen element.
		*/

		console.log(direction + ':' + $(target).attr('id'));

		var s = $('#screen');

		if (direction === this.DIRECTION_THUMBSTRIP_FORWARD) {
			$('#thumbnails').animate({ 'left': '+=' + -1 * (s.width()) + 'px'}, 'slow');
		}

		if (direction === this.DIRECTION_THUMBSTRIP_BACK) {
			$('#thumbnails').animate({ 'left': '+=' + -1 * -(s.width()) + 'px'}, 'slow');
		}
	};

	/*create instance*/
	TFO.Gallery = new TFO.__GalleryInstance();
	TFO.Gallery.setThumbnailListeners();
});
