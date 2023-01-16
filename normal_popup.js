chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
      document.body.innerHTML = '<div class=image-container><br><div class="close-button">X</div><img style="max-height:400px; max-width:100%; height:auto; width: auto" src = "' + request.imageSrc + '"></div>' + document.body.innerHTML;
      sendResponse({farewell: "goodbye"});
    let close_buttons = document.getElementsByClassName("close-button")
    for (i = 0; i < close_buttons.length; i++){
      console.log("Close button obtained!");
      close_buttons[i].addEventListener("click", removeImage);
    }
  }
);

function removeImage() {
  console.log("Removing parentNode");
  console.log(this.outerHTML);
  this.parentNode.remove();
  //element.parentNode.remove();
};
