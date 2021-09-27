
const tabsCount = document.querySelector('.tabsCount');

const setMonsterData = (res)=>{
    console.log(res);
    tabsCount.textContent = res.monster;
}


document.addEventListener('DOMContentLoaded',()=>{
  
        chrome.runtime.sendMessage(
            
            {
                name:"getMonsterData"
            },
            setMonsterData

        )
    })