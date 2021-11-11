// home page pop up
chrome.runtime.onInstalled.addListener(function(object) {
    chrome.tabs.create(
        { 
            url: "https://aunicorndev.github.io/tabsMonster/" 
        }
    );
});
