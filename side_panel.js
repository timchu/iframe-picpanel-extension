let defaultCaption = "(Optional Caption)"
let defaultText = "Click on any image to drop it into this side panel! Images come with Editable Captions"
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log(JSON.stringify(request));
    if (request.imageSrc){
        console.log("Adding image");
        document.body.innerHTML += '<div class=image-container><br><div class="close-button">X</div><img style="max-height:400px; max-width:100%; height:auto; width: auto" src = "' + request.imageSrc + '"><div class="caption" contentEditable>' + defaultCaption + '</div> </div>';// + document.body.innerHTML;
        sendResponse({farewell: "got Image Source"});
    }
    if (request.text) {
        console.log("Adding text");
        document.body.innerHTML += '<div class=text-container><br><div class="close-button">X</div><div style="font-size: 16px; max-height:400px; max-width:100%; height:auto; width: auto">' + request.text + '</div></div>';// + document.body.innerHTML;
        sendResponse({farewell: "got Text"});

    }
/* Aborted attempt to make the sidepanel scroll. I think the problem is that the document HTML doesn't render before I try to scroll down*/
    
    console.log(document.body.scrollHeight);
    scrollTo(0, document.body.scrollHeight);

    // Add Close button functionality. This is needed since setting onClick manually in HTML is banned (why is it banned?)
    let close_buttons = document.getElementsByClassName("close-button")
    for (let i = 0; i < close_buttons.length; i++){
      close_buttons[i].addEventListener("click", removeImage);
    }
    // Making Caption disappear when clicked, if caption contains default content. 
    let captions = document.getElementsByClassName("caption")
    for (let i = 0; i < captions.length; i++){
      captions[i].addEventListener("click", removeText);
    } 
  }
);
function removeText(){
  if (this.innerHTML== defaultCaption){
    this.innerHTML=""
  }
}

function removeImage() {
  console.log("Removing Image");
  this.parentNode.remove();
};
