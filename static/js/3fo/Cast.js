$(function() {
	if (typeof TFO === 'undefined') {
		TFO = {};
	}

	TFO.__CastInstance = function () {
		this.initOverlays();
	};


	TFO.__CastInstance.prototype.initOverlays = function(){
		var container = $(".headshot");

		container.on('mouseenter',
			function (event) {
				var overlay = $(event.currentTarget).children(".member-overlay");
				overlay.css("display", "block");
			}
		);

		container.on('mouseleave',
			function (event) {
				var overlay = $(event.currentTarget).children(".member-overlay");
				overlay.css("display", "none");
			}
		);
	};

	TFO.__CastInstance.prototype.setGalleryHeight = function(){

	};

	//create instance
	TFO.Cast = new TFO.__CastInstance();
});
