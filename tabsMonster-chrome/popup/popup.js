//popup.js

const tabsCount = document.querySelector('.card__tabs-count');
const canvas = document.querySelector('.canvasTest');
const monsterName = document.querySelector('.card__name');
const monsterQuote = document.querySelector('.card__quote');
const monsterStats = document.querySelector('.card__stats');
const weekTabs = document.querySelector('.tabs__week');
const monsterImage = document.querySelector('.monster-image');
const tabsMonsterTab = document.querySelector('#tabsMonster');
const tabsMonsterStatsTab = document.querySelector('#tabsMonsterStats');
const tabsMonsterBar = document.querySelectorAll('.bar');
const setTabsMonsterData = (res)=>{
    console.log(res);
    tabsCount.textContent = res.tabsCount;
    monsterName.textContent = res.monster.monsterName;
    monsterQuote.textContent = res.monster.monsterQuote;
    monsterImage.setAttribute('src',res.monster.monsterBg);
}
const daysInAWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
const setTabsMonsterHubData = (res)=>{

    let graphDates = getPreviousSevenDays();
    let max = -Infinity;
    console.log(res.tabsMonsterHub.dates)
    console.log(max);
    let tabsOnADay = undefined;
    let tabsArray = [];
    graphDates.forEach(graph=>{
        console.log(graph.getDay())
        console.log(graph)
        if(res.tabsMonsterHub.dates[graph.toLocaleDateString()]==undefined){
            tabsOnADay = 0
        }
        else{
            // console.log(res.tabsMonsterHub.dates[graph.toLocaleDateString()])
            tabsOnADay = res.tabsMonsterHub.dates[graph.toLocaleDateString()];

        }
        tabsArray.push([tabsOnADay,daysInAWeek[graph.getDay()]])
        if(tabsOnADay>max){
            max=tabsOnADay
        }
    })
    setGraph(tabsArray,max);


}

document.addEventListener('DOMContentLoaded',()=>{
    
    chrome.tabs.query({windowType:'normal'}, function(tabs) {    
        chrome.storage.local.get(['monsters','tabsMonsterHub'], function(result) {
            let monster;
            let flag = 0;
            console.log(tabs)
            for(let i =0;i<result.monsters.length;i++){
                if(result.monsters[i].monsterLevel > tabs.length){
                    if(i==0){
                        monster = result.monsters[i]

                    }
                    else{
                        monster = result.monsters[i-1]
                    }
                    flag = 1
                    break;
                }
            }
            if(flag==0){
                monster = result.monsters[result.monsters.length -1]
            }
            
            console.log(monster)
            setTabsMonsterData({ monster:monster, tabsCount: tabs.length })    
            setTabsMonsterHubData({tabsMonsterHub:result.tabsMonsterHub})   
        });
    })
    
})
const showTabsMonsterStats = ()=>{
    {
        document.getElementsByClassName('tabsMonster')[0].style.display = "none"; 
        document.getElementsByClassName('tabsMonsterStats')[0].style.display = "flex"; 
        tabsMonsterTab.classList.remove('active');
        tabsMonsterStatsTab.classList.add('active');
}
}

tabsMonsterStatsTab.addEventListener('click',showTabsMonsterStats)
monsterStats.addEventListener('click',showTabsMonsterStats)

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
    html2canvas(document.querySelector("body"),{"useCORS":true}).then(canvas => {
        
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
function getDates (startDate, endDate) {
    const dates = []
    let currentDate = startDate
    const addDays = function (days) {
      const date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
    }
    while (currentDate <= endDate) {
      dates.push(currentDate)
      currentDate = addDays.call(currentDate, 1)
    }
    return dates
}
function getPreviousSevenDays (){

    const today = new Date();
    const yearBeforeCount = today.getDate() - 6 ;
    let prevYearDate = new Date();
    prevYearDate.setDate(yearBeforeCount);
    console.log(prevYearDate)
    
    
    const gridDates = getDates(new Date(prevYearDate.getFullYear(),prevYearDate.getMonth() ,prevYearDate.getDate() ), new Date(today.getFullYear(),today.getMonth() ,today.getDate()))
    return gridDates
}
// this.tabsMonsterHub = JSON.parse(localStorage.getItem('tabsMonster')).tabsMonsterHub.dates;
// this.gridDates = gridDates;

const setGraph =(tabsArray,maxTabsInWeek)=>{

    const graphBars = document.querySelectorAll('.bar');
    let maxIndex=0,maxInWeek = 0;
    let tabsInWeek = 0;
    
    graphBars.forEach((bar,index)=>{
        
        bar.style.height = tabsArray[index][0] == 0 ? 2 : (tabsArray[index][0]/maxTabsInWeek)*100 +"px";
        bar.dataset.bar = tabsArray[index][0];
        bar.dataset.day = tabsArray[index][1];

        tabsInWeek += tabsArray[index][0]
        if(tabsArray[index][0]>maxInWeek){
            maxInWeek=tabsArray[index][0]
            maxIndex = index
        }
        
    })
    tabsMonsterBar[maxIndex].classList.add('bar--max');
    weekTabs.textContent = tabsInWeek;
}

