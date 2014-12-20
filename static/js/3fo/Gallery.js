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
	TFO.__GalleryInstance.prototype.DATA_ATTRIBUTE_SLIDE_TO = 'data-slide-to';
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

		var thumbImages = $('.thumb-image-div .thumbnail');

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
		});

		// start scrolling
		$('.carousel').carousel('cycle');
	};

	TFO.__GalleryInstance.prototype.initializeSlideListener = function () {
		var activeId = $('.item.item-div.active').attr('id');

		$('#thumb-' + activeId.split('-')[1] + ' > img').toggleClass('semi-trans');

		// as the gallery slider moves, show the the current thumb nail
		$('#carousel-gallery').on('slide.bs.carousel', function (event) {
			var gallery = TFO.Gallery,
				currentSlide = $('.carousel-inner').children('.active'),
				currentId = currentSlide.attr('id'),
				currentThumb = $('#thumb-' + String(currentId).split('-')[1]),
				nextSlide = $(event.relatedTarget),
				nextId = nextSlide.attr('id'),
				nextThumb = $('#thumb-' + String(nextId).split('-')[1]),
				screen = $('#screen'),
				thumbNodes = $('.thumb-image-div .thumbnail'),
				slider = $('#thumbnails');

			currentThumb.children('.thumb-img').toggleClass('semi-trans');
			nextThumb.children('.thumb-img').toggleClass('semi-trans');

			if (thumbNodes.filter(':last').attr('id') === $(currentThumb).attr('id')) {
				slider.animate({left: '0px'}, 10, 'linear');
				$('.left-control').css('display','none');
				return;
			}

			//if(nextThumb.attr(gallery.DATA_ATTRIBUTE_MOVE_DIRECTION) === gallery.DIRECTION_THUMBSTRIP_FORWARD
			//	&& currentThumb.attr(gallery.DATA_ATTRIBUTE_MOVE_DIRECTION) === gallery.DIRECTION_THUMBSTRIP_BACK
			//	&& nextThumb.attr(gallery.DATA_ATTRIBUTE_SLIDE_TO) > currentThumb.attr(gallery.DATA_ATTRIBUTE_SLIDE_TO)
			//	&& event.direction !== gallery.DIRECTION_THUMBSTRIP_BACK
			//)
			//{
			//	return;
			//}

			if(currentThumb.attr(gallery.DATA_ATTRIBUTE_MOVE_DIRECTION) === gallery.DIRECTION_THUMBSTRIP_FORWARD
				&& nextThumb.attr(gallery.DATA_ATTRIBUTE_MOVE_DIRECTION) === gallery.DIRECTION_THUMBSTRIP_BACK
				&& currentThumb.attr(gallery.DATA_ATTRIBUTE_SLIDE_TO) > nextThumb.attr(gallery.DATA_ATTRIBUTE_SLIDE_TO)
				&& event.direction === gallery.DIRECTION_THUMBSTRIP_BACK
			) {
				return;
			}

			if (nextThumb.attr(gallery.DATA_ATTRIBUTE_MOVE_DIRECTION) !== gallery.DIRECTION_THUMBSTRIP_NONE &&
				currentThumb.attr(gallery.DATA_ATTRIBUTE_MOVE_DIRECTION) !== gallery.DIRECTION_THUMBSTRIP_NONE) {

				if (currentThumb.attr(gallery.DATA_ATTRIBUTE_MOVE_DIRECTION) === gallery.DIRECTION_THUMBSTRIP_BACK) {
					slider.animate({left: '+=' + screen.width() + 'px'}, 'slow');
				}

				if (currentThumb.attr(gallery.DATA_ATTRIBUTE_MOVE_DIRECTION) === gallery.DIRECTION_THUMBSTRIP_FORWARD) {
					slider.animate({left: '+=' + (-1 * screen.width()) + 'px'}, 'slow');
				}
			}

			if (thumbNodes.filter(':first').attr('id') === $(nextThumb).attr('id')) {
				$('.left-control').css('display','none');
			} else {
				$('.left-control').css('display','block');
			}
		});
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
