// home page pop up
chrome.runtime.onInstalled.addListener(function(object) {
    chrome.tabs.create(
        { 
            url: "https://aunicorndev.github.io/tabsMonster/" 
        },
        ()=>{
            getDataFromAPI("https://e5w1sl.deta.dev/monsters?theme=demo-theme-1",{})
            .then(themes=>{
                console.log(themes.data);
                chrome.storage.local.set({monsterTheme: 'demo-theme-1'}, function() {
                    
                    });
                chrome.storage.local.set({monsters: themes.data}, function() {
                    
                    });
                }
               
            )
            .catch(e=>{
                console.log(e)
            })
            
        }
    );
});
const getDataFromAPI = async(url, body) => {
    console.log(url)
    const response = await fetch(url, body);

    const data = await response.json();
    return data;

}

