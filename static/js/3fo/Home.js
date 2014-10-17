/**
 * Created by keithensign on 7/14/14.
 */
$(function() {
	if (typeof TFO === 'undefined') {
		TFO = {};
	}

	TFO.__HomeInstance = function () {
		this.buildHeroImages();
		this.currentProject = $("#firstProject");
		$("#static-footer").hide();
	};

	TFO.__HomeInstance.prototype.buildHeroImages = function(){
		var data = this.getData();
		var header = TFO.Page.header;
		var projectDiv,tagText,nameText,firstDiv, overlayDiv, textDiv;

		for(var i=0; i < data.length; i++){
			console.log(data[i].name);
			var obj = data[i];
			projectDiv = document.createElement("div");
			projectDiv.setAttribute("class", "container-fluid static-rotation-header ");
			projectDiv.setAttribute("style","background-image: url('/static/img/" + obj.image +"')");

            overlayDiv = document.createElement("div");
            overlayDiv.setAttribute("class", "dark-overlay");

            textDiv = document.createElement("div");
            textDiv.setAttribute("class", "overlay-text");

			tagText = document.createElement("p");
			nameText = document.createElement("p");

			tagText.setAttribute("class", "large-300 yellow-text project-home-tag click");
			nameText.setAttribute("class","small-700 project-home-name click");

			$(tagText).text(obj.tag);
			$(nameText).text(obj.name);
            $(projectDiv).append(overlayDiv);
			$(textDiv).append(tagText);
			$(textDiv).append(nameText);
            $(projectDiv).append(textDiv);
			$(header).prepend(projectDiv);
			$(projectDiv).attr("data-url",obj.url);
			$(projectDiv).on("click",function(event){
				document.location.href=$(event.currentTarget).attr("data-url");
			});

			if(i == 0) {
				firstDiv = $(projectDiv);
				firstDiv.attr("id", "firstProject");
			}

			$(projectDiv).hide();
		}

		$(window).load(function(){
			firstDiv.fadeIn(function(){
				TFO.Home.initRotations();
				TFO.Page.footer.fadeIn();
			});

		});
	};

	TFO.__HomeInstance.prototype.initRotations = function(){
		console.log("set the rotations up");
		setInterval(function(){
			var current = TFO.Home.currentProject;
			TFO.Home.currentProject = current.prev();
			TFO.Home.currentProject.show();
			current.fadeOut(function(){
				current.detach();
				TFO.Page.header.prepend(this);
			});
		}, 5000);
	};

	TFO.__HomeInstance.prototype.getData = function(){

		return [
			{
				"name":"halekulani",
				"url":"/projects/halekulani",
				"tag":"evocative design for luxury hospitality",
				"image":"300feetout_hero_halekulani.jpg"
			},
				{"name":"san francisco ballet",
				"url":"/projects/san-francisco-ballet",
				"tag":"creative campaign takes center stage",
				"image":"300feetout_hero_sf_ballet.jpg"
			},
			{
				"name": "kamalan travels",
				"url": "/projects/kamalan-travels",
				"tag": "responsive design for culture seekers",
				"image": "300feetout_hero_kamalan.jpg"
			},
			{
				"name":"punta cana international airport",
				"url":"/projects/puj",
				"tag":"industry standards soar to new heights",
				"image":"300feetout_hero_puj.jpg"
			},
			{
				"name":"bal harbour",
				"url":"/projects/bal-harbour",
				"tag":"digitally translating luxury lifestyle",
				"image":"300feetout_hero_bal_harbour.jpg"
			},
			{
				"name": "pasolivo",
				"url": "/projects/pasolivo",
				"tag": "organically developed brand identity",
				"image": "300feetout_hero_pasolivo.jpg"
			},
			{
				"name": "walt disney family museum",
				"url": "/projects/walt-disney-family-museum",
				"tag": "brand strategy for an innovative destination",
				"image": "300feetout_hero_walt_disney.jpg"
			}
	   ]
	};

	//create instance
	TFO.Home = new TFO.__HomeInstance();
});
