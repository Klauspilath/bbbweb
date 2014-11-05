$(function() {

	if (typeof TFO === 'undefined') {
		TFO = {};
	}

	TFO.__GalleryInstance = function () {
		this.initializeThumbnailListeners();
		this.initializeResizeListener();
	};


	TFO.__GalleryInstance.prototype.initializeResizeListener = function(){
		var w = $(window);
		$(w).resize(function(){
			//ResponsiveWidth = ThumbWidth(WindowWidth/ScreenWidth)
			var t = $(this), s = $('#screen'), i = $('.thumbnail > img');

			if(t.width() < 1000 && t.width() > 768) {
				i.css('width', 200 * (t.width() / 1000) + 'px');
				console.log('in if ' + i.css('width'));
			} else if (s.width() < 768 && s.width() > 640) {
				i.css('width', s.width()/4 + 'px');
				console.log('in else if ' + i.css('width') + ' : ' +  s.width()/4 +' : ' + s.width() );
			} else if (t.width() < 640) {
				i.css('width', s.width()/3 + 'px');
				console.log('in 2nd else if ' + i.css('width') + ' : ' +  s.width()/3 +' : ' + s.width() );
			} else {
				i.css('width','200px');
				console.log('in else ' + i.css('width'));
			}
		});
	};

	TFO.__GalleryInstance.prototype.initializeThumbnailListeners = function(){
		// use the modulo algorithm to assign listeners to the 5 and 6 thumbnails in the
		// row. Run this function again once the row shows 3 thumbnail images.



	};

	TFO.__GalleryInstance.prototype.shiftThumbs = function(event){
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


	};

	//create instance
	TFO.Gallery = new TFO.__GalleryInstance();
});
