url = document.URL
// This is a hack.... the iframe doesn't load or something, and doesn't take up the whole body???
// Next time, click the button to open the sidepanel as well.
frames = '<div style="float:left; width:60%"> <iframe id="mainframe" style="height:100vh" width="100%" src="' + url + '" style="-webkit-transform:scale(1);-moz-transform-scale(1);" title="W3Schools Free Online Web Tutorials"></iframe> </div>' + ' <div style="float:left; width:40%"> <iframe style="height:100vh" width="100%" src="' + chrome.runtime.getURL("side_panel.html") + '" style="-webkit-transform:scale(1);-moz-transform-scale(1);" title="W3Schools Free Online Web Tutorials"></iframe> </div>'
document.body.innerHTML = frames

async function clickEnable(t) { 
  await new Promise(r => setTimeout(r, t));
  clickedBody();
}
async function enterEnable(t){
  await new Promise(r => setTimeout(r, t));
  logText();
}
// Catch all the links loaded by iframe
clickEnable(1000);
clickEnable(2000);
clickEnable(5000);
clickEnable(15000);
enterEnable(2000);
//document.body.addEventListener('click', function(){ clickedBody(); });
function logText(){
    console.log("LogText registered");
  let iframe = document.getElementById('mainframe')
  iframe.contentWindow.document.body.addEventListener('keypress', function(e) {
    // Ensures the keydown is only registered once per key press.
    if (e.repeat) return;
    if (e.key == 'Enter'){
      console.log("Logged enter");
      (async () => { const response = await chrome.runtime.sendMessage({text: iframe.contentWindow.document.getSelection().toString() }); 
      })();
    }
  });
}
function clickedBody(){
  let iframe = document.getElementById('mainframe');
  let images = iframe.contentWindow.document.body.getElementsByTagName("img");
  for (i = 0; i < images.length; i++){
    let image = images[i]
    image.onclick = function(){onclick(image.src)}
  }
}
function onclick(myImageSrc){
  (async () => { const response = await chrome.runtime.sendMessage({imageSrc: myImageSrc}); })();
}
