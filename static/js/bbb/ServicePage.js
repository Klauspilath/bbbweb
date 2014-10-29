/**
 * Created by keithensign on 8/8/14.
 */
$(function() {

	if (typeof TFO === 'undefined') {
		console.log('TFO does not exist');
		TFO = {};
	}

	if (typeof TFO !== 'undefined') {
		console.log('TFO does exist');
	}
	TFO.__ServicesPageInstance = function(){
		this.indicator = $("#indicator");
		this.activeService = $("#service-branding");
		this.detailDisplay = $("#active-detail");
		this.enableTouch();
	};

	TFO.__ServicesPageInstance.prototype.init = function(){

		var as = TFO.ServicesPage.activeService;
		var d = as.offset().left + as.width()/2;
		as.addClass(as.attr("id") + "-on");
		TFO.ServicesPage.indicator.animate({"left":d});
		TFO.ServicesPage.updateDetail();

		//prepare mouseenter event
		$(".service-icon").mouseenter(function() {
				TFO.ServicesPage.moveSlider(event);
			}
		);
	};

	TFO.__ServicesPageInstance.prototype.moveSlider = function(event){

		var d = $(event.currentTarget).offset().left + $(event.currentTarget).width()/2;

		TFO.ServicesPage.indicator.animate({"left":d});
		TFO.ServicesPage.activeService = $(event.currentTarget);
		TFO.ServicesPage.activeService.addClass(TFO.ServicesPage.activeService.attr("id") + "-on");

		$(".service-icon").not($(event.currentTarget)).removeClass(function(){
			return $(this).attr("id") + "-on";
		});

		TFO.ServicesPage.updateDetail();
	};

	TFO.__ServicesPageInstance.prototype.enableTouch = function(){
		var el = $(".touch");

		el.on("touchstart", function(event){
			//event.preventDefault();
			TFO.ServicesPage.moveSlider(event);
		});
	};

	TFO.__ServicesPageInstance.prototype.updateDetail = function(){

		var p = TFO.ServicesPage;
		var s = "#" + p.activeService.attr("data-service") + " .service-summary";
		var aId = "#" + p.activeService.attr("id");
		var summary = $("#active-detail .service-summary");
		var name = $(".view-more-name", p.detailDisplay);

		summary.fadeOut("fast",function(){
			summary.html($(s).html());
			name.html(p.activeService.attr("data-service"));
			$("#active-detail").removeClass("invisible");
		});

		summary.fadeIn("fast");
		$("#active-detail").off("click");

		$("#active-detail, " + aId).click(
			function(){
				document.location.href = p.activeService.attr("data-service");
			}
		);
	};

	TFO.ServicesPage = new TFO.__ServicesPageInstance();
	TFO.ServicesPage.init();
});
