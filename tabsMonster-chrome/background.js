// home page pop up
chrome.runtime.onInstalled.addListener(function(object) {
    chrome.tabs.create({ url: "https://aunicorndev.github.io/tabsMonster/" }, function(tab) {

    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.name === "getMonsterData"){
                chrome.tabs.query({windowType:'normal'}, function(tabs) {    
                        console.log(tabs.length);
                        sendResponse({'monster':tabs.length})  
                })
                return true;
        }
});
