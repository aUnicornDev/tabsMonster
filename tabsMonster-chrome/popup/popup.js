//popup.js

const tabsCount = document.querySelector('.tabs-count');
const canvas = document.querySelector('.canvasTest');
const monsterName = document.querySelector('.card__name');
const monsterQuote = document.querySelector('.card__quote');
const monsterImage = document.querySelector('.monster-image');
const tabsMonsterTab = document.querySelector('#tabsMonster');
const tabsMonsterStatsTab = document.querySelector('#tabsMonsterStats');
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

tabsMonsterStatsTab.addEventListener('click',()=>{
    document.getElementsByClassName('tabsMonster')[0].style.display = "none"; 
    document.getElementsByClassName('tabsMonsterStats')[0].style.display = "flex"; 
    tabsMonsterTab.classList.remove('active');
    tabsMonsterStatsTab.classList.add('active');
})

tabsMonsterTab.addEventListener('click',()=>{
    document.getElementsByClassName('tabsMonsterStats')[0].style.display = "none";
    document.getElementsByClassName('tabsMonster')[0].style.display = "flex";
    tabsMonsterStatsTab.classList.remove('active');
    tabsMonsterTab.classList.add('active');
})



const options = document.querySelector('.options');
options.addEventListener('click',(e)=>{
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options.html'));
      }
    })

const share = document.querySelector('.share');
const shareOption = document.querySelector('.share__options');
const download = document.querySelector('.download');
share.addEventListener('focus',()=>{
    shareOption.classList.toggle('hide');
    share.blur(); 

})
download.addEventListener('click',()=>{
    share.focus();
    html2canvas(document.querySelector(".tabsMonster"),{"useCORS":true}).then(canvas => {
        
        let link = document.createElement('a');
        link.download = 'filename.png';
        link.href = canvas.toDataURL()
        link.click();
    });
})

const shareTwitter = document.querySelector('.twitter');
shareTwitter.addEventListener('click',()=>{
    let text =encodeURI(`\nSending this tweet from the Chrome extension itself. Will share progress on the design soon. Thanks again to @fireship_dev for such a perfectly timed Youtube shorts and to @dicebearcom.\n`);
    window.open(`https://twitter.com/intent/tweet?text=Day 25 of %23100DaysofCode.`+`${text}` + `%23buildinpublic %23tabsMonster`)
    
})