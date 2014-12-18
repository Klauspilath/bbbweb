$(window).load(function () {

	window.timer = null;

	if (typeof TFO === 'undefined') {
		TFO = {};
	}

	TFO.__GalleryInstance = function () {
		this.initializeResizeListener();
		this.initializeSlideListener();
	};

	TFO.__GalleryInstance.prototype.DEFAULT_SCREEN_WIDTH = 1000;
	TFO.__GalleryInstance.prototype.MOBILE_MEDIUM_WIDTH = 768;
	TFO.__GalleryInstance.prototype.MOBILE_SMALL_WIDTH = 640;
	TFO.__GalleryInstance.prototype.MAX_THUMBS_PER_SLIDE = 5;
	TFO.__GalleryInstance.prototype.MEDIUM_THUMBS_PER_SLIDE = 4;
	TFO.__GalleryInstance.prototype.SMALL_THUMBS_PER_SLIDE = 3;
	TFO.__GalleryInstance.prototype.DIRECTION_THUMBSTRIP_FORWARD = 'left';
	TFO.__GalleryInstance.prototype.DIRECTION_THUMBSTRIP_BACK = 'right';
	TFO.__GalleryInstance.prototype.DIRECTION_THUMBSTRIP_NONE = 'none';
	TFO.__GalleryInstance.prototype.DATA_ATTRIBUTE_MOVE_DIRECTION = 'data-move-direction';
	TFO.__GalleryInstance.prototype.DATA_ATTRIBUTE_START = 'data-start';
	TFO.__GalleryInstance.prototype.DATA_ATTRIBUTE_END = 'data-end';
	TFO.__GalleryInstance.prototype.currentMaxThumbs = 5;
	TFO.__GalleryInstance.prototype.initializeResizeListener = function () {

		$(window).resize(function () {

			var screen = $('#screen'),
				screenWidth = screen.width(),
				thumbImage = $('.thumbnail > img'),
				galleryInstance = TFO.Gallery;

			//stop scrolling
			$('.carousel').carousel('pause');

			if (($(window).scrollTop() === 0)) TFO.Gallery.setGalleryHeight();

			// between 1000 and 768
			// this should just resize to the screen width/max thumbs per slide
			if (screenWidth < galleryInstance.DEFAULT_SCREEN_WIDTH && screenWidth > galleryInstance.MOBILE_MEDIUM_WIDTH) {

				thumbImage.css('width', screenWidth / galleryInstance.MAX_THUMBS_PER_SLIDE + 'px');
				galleryInstance.currentMaxThumbs = galleryInstance.MAX_THUMBS_PER_SLIDE;

				//between 768 and 640
			} else if (screenWidth < galleryInstance.MOBILE_MEDIUM_WIDTH && screenWidth > galleryInstance.MOBILE_SMALL_WIDTH) {
				thumbImage.css('width', screenWidth / galleryInstance.MEDIUM_THUMBS_PER_SLIDE + 'px');
				galleryInstance.currentMaxThumbs = galleryInstance.MEDIUM_THUMBS_PER_SLIDE;

				// less than 640
			} else if (screenWidth < galleryInstance.MOBILE_SMALL_WIDTH) {
				thumbImage.css('width', screenWidth / galleryInstance.SMALL_THUMBS_PER_SLIDE + 'px');
				galleryInstance.currentMaxThumbs = galleryInstance.SMALL_THUMBS_PER_SLIDE;

				// default
			} else {
				// grow
				thumbImage.css('width', screenWidth / galleryInstance.MAX_THUMBS_PER_SLIDE + 'px');
			}

			// track the currently selected thumbnail and reposition the thumbnail strip relative to it.
			clearTimeout(timer);
			window.timer = setTimeout(TFO.Gallery.setThumbnailListeners, 500);

		});
	};

	TFO.__GalleryInstance.prototype.setGalleryHeight = function () {
		var hg = $('#carousel-gallery'),
			tn = $("#thumbnails"),
			nv = $("nav"),
			hd = $("header");

		hg.css("height", $(window).height()
			- (hd.height()
			+ nv.height()
			+ tn.height())
		);
	};

	TFO.__GalleryInstance.prototype.setThumbnailListeners = function () {

		var thumbImages = $('.thumb-image .thumbnail');

		thumbImages.each(function (index) {

			var g = TFO.Gallery,
				isStart = index == 0 ? false : !(Boolean(index % g.currentMaxThumbs)),
				isEnd = index == (thumbImages.length - 1) ? true : index % g.currentMaxThumbs == (g.currentMaxThumbs - 1),
				thumb = $(this);

			if (!isEnd && !isStart) {
				thumb.attr(g.DATA_ATTRIBUTE_MOVE_DIRECTION, g.DIRECTION_THUMBSTRIP_NONE);
				return;
			}
			console.log(index + " : isStart=" + isStart + ' : isEnd=' + isEnd + ': %=' + index % g.currentMaxThumbs);

			if (isEnd) {
				thumb.attr(g.DATA_ATTRIBUTE_MOVE_DIRECTION, g.DIRECTION_THUMBSTRIP_FORWARD);
				thumb.attr(g.DATA_ATTRIBUTE_END, isEnd);
			} else if (isStart) {
				thumb.attr(g.DATA_ATTRIBUTE_START, isStart);
				thumb.attr(g.DATA_ATTRIBUTE_MOVE_DIRECTION, g.DIRECTION_THUMBSTRIP_BACK);
			}

			if (index != (thumbImages.length - 1)) {

				thumb.off('click');
				thumb.on('click', function (event) {
					g.shiftThumbsOnClick(event);
				});
			}
		});

		// start scrolling
		$('.carousel').carousel('cycle');
	};

	TFO.__GalleryInstance.prototype.initializeSlideListener = function () {
		var activeId = $('.item.item-div.active').attr('id');

		$('.thumbnail.' + activeId + '> img').toggleClass('semi-trans');

		// as the gallery slider moves, show the the current thumb nail
		$('#carousel-gallery').on('slide.bs.carousel', function (event) {
			var gallery = TFO.Gallery,
				currentSlide = $(event.currentTarget),
				currentId = currentSlide.attr('id'),
				currentThumb = $('#thumb-' + String(currentId).split('-')[1]),
				nextSlide = $(event.relatedTarget),
				nextId = nextSlide.attr('id'),
				nextThumb = $('#thumb-' + String(nextId).split('-')[1]),
				screen = $('#screen'),
				thumbNodes = $('.thumb-image .thumbnail');

			//direction = event.direction,

			// toggle semi transparency
			currentThumb.toggleClass('semi-trans');


			nextThumb.toggleClass('semi-trans');

			//move to the start
			if (thumbNodes.filter(':last').attr('id') === $(target).attr('id')) {
				$('#thumbnails').animate({'left': '0px'}, 10, 'linear');
				return;
			}

			//move left/back
			if (currentSlide.attr(gallery.DATA_ATTRIBUTE_MOVE_DIRECTION) === gallery.DIRECTION_THUMBSTRIP_BACK) {
				$('#thumbnails').animate({'left': '+=' + s.width() + 'px'}, 'slow');
			}

			if (currentSlide.attr(gallery.DATA_ATTRIBUTE_MOVE_DIRECTION) === gallery.DIRECTION_THUMBSTRIP_FORWARD) {
				$('#thumbnails').animate({'left': '+=' + (-1 * s.width()) + 'px'}, 'slow');
			}

			//console.log(currentThumb.attr(TFO.Gallery.DATA_ATTRIBUTE_START) === "true");

			//if (currentThumb.attr(TFO.Gallery.DATA_ATTRIBUTE_END) === "true") {
			//    TFO.Gallery.shiftThumbsOnSlide(direction, currentThumb);
			//}

			//if (currentThumb.attr(TFO.Gallery.DATA_ATTRIBUTE_START) === "true") {
			//    TFO.Gallery.shiftThumbsOnSlide(direction, currentThumb);
			//}

		});
	};


	// this needs to work in revers
	TFO.__GalleryInstance.prototype.shiftThumbsOnSlide = function (direction, target) {

		console.log(direction + ':' + $(target).attr('id'));

		var s = $('#screen'),
			thumbNodes = $('.thumb-image .thumbnail');

		//go back to the start
		if (thumbNodes.filter(':last').attr('id') === $(target).attr('id')) {
			$('#thumbnails').animate({'left': '0px'}, 10, 'linear');
			return;
		}

		if (direction === this.DIRECTION_THUMBSTRIP_FORWARD) {
			$('#thumbnails').animate({'left': '+=' + (-1 * s.width()) + 'px'}, 'slow');
			return;
		}

		if (direction === this.DIRECTION_THUMBSTRIP_BACK) {
			$('#thumbnails').animate({'left': '+=' + s.width() + 'px'}, 'slow');
		}
	};

	// garbage
	TFO.__GalleryInstance.prototype.shiftThumbsOnClick = function (event) {
		console.log(event.currentTarget);

		// set a state on the class so the carousel will cycle, but not only move the
		// thumbs by the currentMaxThumbs -1

	};


	/*create instance*/
	TFO.Gallery = new TFO.__GalleryInstance();
	console.log('window totally loaded.');
	$(window).trigger('resize');
	console.log('resize triggered.');
});


$(function () {
	console.log('document.ready ');
});
