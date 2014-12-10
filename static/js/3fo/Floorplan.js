if (typeof TFO === 'undefined') {
    TFO = {};
}

TFO.__FloorPlanInstance = function () {

};


TFO.__FloorPlanInstance.prototype.init = function () {
    var svg = document.getElementById('Layer_1');

    if (svg != null) {
        this.setSVGLoadListener();
    }
};

TFO.__FloorPlanInstance.prototype.cooridinates = {
    "FRONT":"0px",
    "REAR":"300px",
    "REAR_BALCONY":"600px",
    "CENTER_BALCONY":"900px",
    "CYRIL":"1200px",
    "RIGHT_BOX":"1500px",
    "LEFT_BOX":"1800px",
    "CENTER_BOX":"2100px"
};

TFO.__FloorPlanInstance.prototype.setSVGLoadListener = function () {

    var svg = document.getElementById('Layer_1');

    svg.addEventListener('load', function () {
        TFO.FloorPlan.setSectionListeners();
    });
};


TFO.__FloorPlanInstance.prototype.setSectionListeners = function () {

    var SVGLayers = document.getElementById('overlays');

    for (var i = 0; i < SVGLayers.children.length; i++) {
        SVGLayers.children[i].addEventListener('mouseover',
            function (event) {
                var section_event = document.createEvent("Event");
                section_event.initEvent("section_triggered", true, false);
                section_event.data = {
                    "target": event.currentTarget.id
                };
                top.TFO.FloorPlan.updateStage(section_event);
            });
    }
};

TFO.__FloorPlanInstance.prototype.updateStage = function (event) {
    console.log(this.cooridinates[event.data.target]);
    $("#stage-view").css("background-position", "0 -" + this.cooridinates[event.data.target]);

};

//create instance
TFO.FloorPlan = new TFO.__FloorPlanInstance();
TFO.FloorPlan.init();



