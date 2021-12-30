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

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        
        if(request.message === "getNumberOfTabs"){
            console.log("Request to process Monster Data")
            

                chrome.tabs.query({windowType:'normal'}, function(tabs) {
                    
                        
                        sendResponse({'tabsCount':tabs.length})
                        
                    
                    
                    })
                }      
        return true;
    }
  );

chrome.tabs.onCreated.addListener(tabs=>{
    
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let localDate = today.toLocaleDateString();
    chrome.storage.local.get(['tabsMonsterHub'], function(result) {
        
        if(!result.tabsMonsterHub){
            result.tabsMonsterHub = {};
            result.tabsMonsterHub.dates = {};
            chrome.tabs.query({windowType:'normal'}, function(tabs) {   
                result.tabsMonsterHub.dates[localDate] = tabs.length;
                result.tabsMonsterHub.maxTabs = tabs.length
                result.tabsMonsterHub.totalTabs= tabs.length
                chrome.storage.local.set({"tabsMonsterHub":result.tabsMonsterHub},()=>{
                    // console.log(result.tabsMonsterHub)

                })
                
            })

        }
        else{

            result.tabsMonsterHub.totalTabs+=1
            if(result.tabsMonsterHub.dates[localDate]){
                let localDateCount;
                localDateCount = result.tabsMonsterHub.dates[localDate];
                localDateCount =  localDateCount + 1;
                result.tabsMonsterHub.dates[localDate] = localDateCount;
            }else{
                let localDateCount = 1;
                result.tabsMonsterHub.dates[localDate] = localDateCount; 
            }

            chrome.tabs.query({windowType:'normal'}, function(tabs) {   
                
                if(result.tabsMonsterHub.maxTabs<tabs.length)
                result.tabsMonsterHub.maxTabs = tabs.length
                chrome.storage.local.set({"tabsMonsterHub":result.tabsMonsterHub},()=>{
                    // console.log(result.tabsMonsterHub)      
                })
                
            })
        }
    });
})

const getDataFromAPI = async(url, body) => {
    console.log(url)
    const response = await fetch(url, body);

    const data = await response.json();
    return data;

}

