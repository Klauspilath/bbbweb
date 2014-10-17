/**
 * Created by keithensign on 10/8/14.
 */
document.getElementById("svg-top").addEventListener("click", sendClickToParentDocument, false);

function sendClickToParentDocument(evt)
{
	parent.location.href = this.ownerDocument.defaultView.frameElement.getAttribute("data-next");
}
