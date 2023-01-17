console.log("Background loaded")
chrome.action.onClicked.addListener((tab) => {
    console.log("Clicked!")
});
