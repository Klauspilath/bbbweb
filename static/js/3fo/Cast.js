$(function() {
	if (typeof TFO === 'undefined') {
		TFO = {};
	}

	TFO.__CastInstance = function () {
		this.initOverlays();
	};

	TFO.__CastInstance.prototype.initOverlays = function(){

		if( !TFO.globals.constants.IS_MOBILE ) {
			var container = $(".headshot");

			container.on('mouseenter',
				function (event) {
					var overlay = $(event.currentTarget).children(".member-overlay");
					overlay.css("display", "block");
					overlay.toggleClass('red-semi-trans');
					$(event.currentTarget).children('.cast-member-name').toggleClass('red-semi-trans');
				}
			);

			container.on('mouseleave',
				function (event) {
					var overlay = $(event.currentTarget).children(".member-overlay");
					overlay.css("display", "none");
					overlay.toggleClass('red-semi-trans');
					$(event.currentTarget).children('.cast-member-name').toggleClass('red-semi-trans');
				}
			);

		}
	};

	TFO.Cast = new TFO.__CastInstance();
});
