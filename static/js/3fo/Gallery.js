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
    TFO.__GalleryInstance.prototype.DATA_ATTRIBUTE_SET_ID = 'data-set-id';
    TFO.__GalleryInstance.prototype.currentMaxThumbs = 5;

    TFO.__GalleryInstance.prototype.initializeResizeListener = function () {

        $(window).resize(function () {

            var screen = $('#screen'),
                screenWidth = screen.width(),
                thumbImage = $('.thumbnail > img'),
                galleryInstance = TFO.Gallery;

            $('.carousel').carousel('pause');

            if (($(window).scrollTop() === 0)) TFO.Gallery.setGalleryHeight();

            if (screenWidth < galleryInstance.DEFAULT_SCREEN_WIDTH && screenWidth > galleryInstance.MOBILE_MEDIUM_WIDTH) {

                thumbImage.css('width', screenWidth / galleryInstance.MAX_THUMBS_PER_SLIDE + 'px');
                galleryInstance.currentMaxThumbs = galleryInstance.MAX_THUMBS_PER_SLIDE;

            } else if (screenWidth < galleryInstance.MOBILE_MEDIUM_WIDTH && screenWidth > galleryInstance.MOBILE_SMALL_WIDTH) {
                thumbImage.css('width', screenWidth / galleryInstance.MEDIUM_THUMBS_PER_SLIDE + 'px');
                galleryInstance.currentMaxThumbs = galleryInstance.MEDIUM_THUMBS_PER_SLIDE;

            } else if (screenWidth < galleryInstance.MOBILE_SMALL_WIDTH) {
                thumbImage.css('width', screenWidth / galleryInstance.SMALL_THUMBS_PER_SLIDE + 'px');
                galleryInstance.currentMaxThumbs = galleryInstance.SMALL_THUMBS_PER_SLIDE;

            } else {
                thumbImage.css('width', screenWidth / galleryInstance.MAX_THUMBS_PER_SLIDE + 'px');
            }

            clearTimeout(timer);
            window.timer = setTimeout(TFO.Gallery.setThumbnailListeners, 5000);
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
        var setId = 0;
        var G = TFO.Gallery;

        thumbImages.each(function (index) {

            var isStart = index == 0 ? false : !(Boolean(index % G.currentMaxThumbs)),
                isEnd = index == (thumbImages.length - 1) ? true : index % G.currentMaxThumbs == (G.currentMaxThumbs - 1),
                thumb = $(this);

            if (!isEnd && !isStart) {
                thumb.attr(G.DATA_ATTRIBUTE_MOVE_DIRECTION, G.DIRECTION_THUMBSTRIP_NONE);
                thumb.attr(G.DATA_ATTRIBUTE_SET_ID, setId);
                return;
            }

            if (isEnd) {
                thumb.attr(G.DATA_ATTRIBUTE_MOVE_DIRECTION, G.DIRECTION_THUMBSTRIP_FORWARD);
                thumb.attr(G.DATA_ATTRIBUTE_END, isEnd);
                thumb.attr(G.DATA_ATTRIBUTE_SET_ID, setId);
            } else if (isStart) {
                setId = index;
                thumb.attr(G.DATA_ATTRIBUTE_START, isStart);
                thumb.attr(G.DATA_ATTRIBUTE_MOVE_DIRECTION, G.DIRECTION_THUMBSTRIP_BACK);
                thumb.attr(G.DATA_ATTRIBUTE_SET_ID, setId);
            }
        });

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
                $('.left-control').css('display', 'none');
                return;
            }

            if (thumbNodes.filter(':first').attr('id') === $(nextThumb).attr('id')) {
                $('.left-control').css('display', 'none');
            } else {
                $('.left-control').css('display', 'block');
            }

            if(nextThumb.attr(gallery.DATA_ATTRIBUTE_SET_ID) == currentThumb.attr(gallery.DATA_ATTRIBUTE_SET_ID))
                return;

            if (nextThumb.attr(gallery.DATA_ATTRIBUTE_MOVE_DIRECTION) !== gallery.DIRECTION_THUMBSTRIP_NONE &&
                currentThumb.attr(gallery.DATA_ATTRIBUTE_MOVE_DIRECTION) !== gallery.DIRECTION_THUMBSTRIP_NONE) {

                if (currentThumb.attr(gallery.DATA_ATTRIBUTE_MOVE_DIRECTION) === gallery.DIRECTION_THUMBSTRIP_BACK) {
                    slider.animate({left: '+=' + screen.width() + 'px'}, 'slow');
                }

                if (currentThumb.attr(gallery.DATA_ATTRIBUTE_MOVE_DIRECTION) === gallery.DIRECTION_THUMBSTRIP_FORWARD) {
                    slider.animate({left: '+=' + (-1 * screen.width()) + 'px'}, 'slow');
                }
            }


        });
    };

    TFO.Gallery = new TFO.__GalleryInstance();
    console.log('window totally loaded.');
    $(window).trigger('resize');
    console.log('resize triggered.');
});

$(function () {
    console.log('document.ready ');
});
