

document.getElementById('Layer_1').addEventListener('load', function(){setListeners()});

function setListeners(){
        var elements = document.getElementsByClassName('section');





		document.getElementById('front').addEventListener('click',
			function(event){

                //top.notify(event);



                var section_event = document.createEvent("Event");
                section_event.initEvent("section_triggered",true,false);

                //var section_event = new Event('section_triggered');
                //section_event.bubbles = true;
			   // alert(event.currentTarget.getAttribute('id') + ":" + document.readyState);
                //document.getElementById('Layer_1').dispatchEvent(section_event);

                top.notify(section_event);

		});


}
