//popup.js

const tabsCount = document.querySelector('.tabs-count');
const canvas = document.querySelector('.canvasTest');
const monsterName = document.querySelector('.card__name');
const monsterQuote = document.querySelector('.card__quote');
const monsterImage = document.querySelector('.monster-image');
const setMonsterData = (res)=>{
    console.log(res);
    tabsCount.textContent = res.tabsCount;
    monsterName.textContent = res.monster.monsterName;
    monsterQuote.textContent = res.monster.monsterQuote;
    monsterImage.setAttribute('src',res.monster.monsterBg);
}


document.addEventListener('DOMContentLoaded',()=>{
    
    chrome.tabs.query({windowType:'normal'}, function(tabs) {    
        chrome.storage.local.get(['monsters'], function(result) {
            let monster;
            let flag = 0;
            for(let i =0;i<result.monsters.length;i++){
                if(result.monsters[i].monsterLevel > tabs.length){
                    monster = result.monsters[i-1]
                    flag = 1
                    break;
                }
            }
            if(flag==0){
                monster = result.monsters[result.monsters.length -1]
            }
            setMonsterData({ monster:monster, tabsCount: tabs.length })       
        });
    })
    
})



const options = document.querySelector('.options');
options.addEventListener('click',(e)=>{
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options.html'));
      }
    })

