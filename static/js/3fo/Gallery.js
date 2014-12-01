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
    TFO.__GalleryInstance.prototype.DATA_ATTRIBUTE_MOVE_DIRECTION = 'data-move-direction';
    TFO.__GalleryInstance.prototype.DATA_ATTRIBUTE_START = 'data-start';
    TFO.__GalleryInstance.prototype.DATA_ATTRIBUTE_END = 'data-end';
    TFO.__GalleryInstance.prototype.currentMaxThumbs = TFO.__GalleryInstance.prototype.MAX_THUMBS_PER_SLIDE;
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

            console.log(index + " : isStart=" + isStart + ' : isEnd=' + isEnd + ': %=' + index % g.currentMaxThumbs);

            thumb.off('click');

            thumb.attr(g.DATA_ATTRIBUTE_START, isStart);

            thumb.attr(g.DATA_ATTRIBUTE_END, isEnd);

            if (!isEnd && !isStart) {
                thumb.attr(g.DATA_ATTRIBUTE_MOVE_DIRECTION, 'none');
                return;
            }

            if (isEnd) {
                thumb.attr(g.DATA_ATTRIBUTE_MOVE_DIRECTION, g.DIRECTION_THUMBSTRIP_FORWARD);
            } else if (isStart) {
                thumb.attr(g.DATA_ATTRIBUTE_MOVE_DIRECTION, g.DIRECTION_THUMBSTRIP_BACK);
            }

            if(index != (thumbImages.length - 1)) {
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
            var slide = $(event.relatedTarget),
                direction = event.direction,
                activeId = $('.item.item-div.active').attr('id'),
                thumb = $('#thumb-' + String(activeId).split('-')[1]);

            $('.thumbnail.' + activeId + '> img').toggleClass('semi-trans');
            $('.thumbnail.' + $(slide).attr('id') + '> img').toggleClass('semi-trans');
            //console.log(thumb.attr(TFO.Gallery.DATA_ATTRIBUTE_START) === "true");


            if (thumb.attr(TFO.Gallery.DATA_ATTRIBUTE_END) === "true") {
                TFO.Gallery.shiftThumbsOnSlide(direction, thumb);
            }
        });
    };


    TFO.__GalleryInstance.prototype.shiftThumbsOnClick = function (event) {
        console.log(event.currentTarget);
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

    /*create instance*/
    TFO.Gallery = new TFO.__GalleryInstance();
    console.log('window totally loaded.');
    $(window).trigger('resize');
    console.log('resize triggered.');
});


$(function () {
    console.log('document.ready ');
});
