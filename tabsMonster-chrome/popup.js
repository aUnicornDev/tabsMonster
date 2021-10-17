//popup.js

const tabsCount = document.querySelector('.tabsCount');

const setMonsterData = (res)=>{

    tabsCount.textContent = res.monster;
}


document.addEventListener('DOMContentLoaded',()=>{
  
    chrome.tabs.query({windowType:'normal'}, function(tabs) {    
        setMonsterData({ monster:tabs.length })       
    })
    
})
