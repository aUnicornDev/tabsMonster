chrome.runtime.sendMessage({message: "getNumberOfTabs"}, function(response) {
    
    console.log(response.tabsCount)
    
        chrome.storage.local.get(['tabsMonsterHub','monsterTheme','monsters'], function(result) {
            result.tabsCount = response.tabsCount;
            let monster;
            let flag = 0;
            for(let i =0;i<result.monsters.length;i++){
                if(result.monsters[i].monsterLevel > response.tabsCount.length){
                    monster = result.monsters[i-1]
                    flag = 1
                    break;
                }
            }
            if(flag==0){
                monster = result.monsters[result.monsters.length -1]
            }

            localData = {}
            localData.tabsCount = response.tabsCount;
            localData.monster = monster;
            localData.tabsMonsterHub = result.tabsMonsterHub;

            localStorage.setItem('tabsMonster',JSON.stringify(localData));
                   
        });
    
    
});