let defaultCaption = "Editable Caption"
let defaultText = "Click on any image to drop it into this side panel! Images come with Editable Captions"
document.body.innerHTML = '<h2>' + defaultText + '</h2>'
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
      document.body.innerHTML = '<div class=image-container><br><div class="close-button">X</div><img style="max-height:400px; max-width:100%; height:auto; width: auto" src = "' + request.imageSrc + '"><div class="caption" contentEditable>' + defaultCaption + '</div> </div>' + document.body.innerHTML;
      sendResponse({farewell: "goodbye"});
    let close_buttons = document.getElementsByClassName("close-button")
    for (let i = 0; i < close_buttons.length; i++){
      console.log("Close button obtained!");
      close_buttons[i].addEventListener("click", removeImage);
    }
    let captions = document.getElementsByClassName("caption")
    for (let i = 0; i < captions.length; i++){
      console.log("Caption obtained!");
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
  console.log("Removing parentNode");
  console.log(this.outerHTML);
  this.parentNode.remove();
  //element.parentNode.remove();
};
