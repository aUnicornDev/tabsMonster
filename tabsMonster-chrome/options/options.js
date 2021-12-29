let themesUI = document.querySelector('.themes');
document.addEventListener('DOMContentLoaded',()=>{
    console.log("WHAT")
    
    getDataFromAPI("https://e5w1sl.deta.dev/themes", {})
    .then(response => {
        
        chrome.storage.local.get(['monsterTheme'], function(result) {
            console.log(result)
        response.data.forEach(theme => {
                themeHTML = ''
                console.log(theme)
                if(result.monsterTheme === theme.monsterTheme){

                    themeHTML = `
                    <div class="card active" data-theme = "${theme.monsterTheme}">
                        <img src="${theme.monsterThemeBg}" alt="" class="card__theme-bg">
                        <p class="card__theme">
                            ${theme.monsterTheme}
                        </p>
                        
                    </div>
                    ` 
                }
                else{
                    themeHTML = `
                    <div class="card" data-theme = "${theme.monsterTheme}">
                        <img src="${theme.monsterThemeBg}" alt="" class="card__theme-bg">
                        <p class="card__theme">
                            ${theme.monsterTheme}
                        </p>
                        
                    </div>
                    ` 
                }
                themesUI.innerHTML+=themeHTML; 
                
            });

        })
        
    }).catch(e=>{
        console.log(e)
    }) 
  
})


themesUI.addEventListener('click',e=>{
    if(e.target.classList.contains('card')){
        let newTheme = e.target.dataset.theme;
        console.log('new theme')
        getDataFromAPI(`https://e5w1sl.deta.dev/monsters?theme=${newTheme}`, {})
        .then(monsters => {
            chrome.storage.local.set({monsters: monsters.data}, function() {
                console.table(monsters.data);
            })
        })

        let themes = [...document.querySelectorAll('.card')];
      
        themes.forEach(theme=>{
            theme.classList.remove('active');
        })
        e.target.classList.add('active')
        chrome.storage.local.set({monsterTheme: newTheme}, function() {
            console.log('Value is set to ' + newTheme );
        });

    }
})

const getDataFromAPI = async(url, body) => {
    console.log(url)
    const response = await fetch(url, body);

    const data = await response.json();
    return data;

}



// const tabTips = document.querySelectorAll('input[type="radio"]');
// console.log(tabTips)

// tabTips.forEach(tab={

// })
// tabTips.addEventListener('change',(e)=>{
//     console.log(e.target);
// })

// function isNotBlank(value){
//     if(value==="")
//         return false;
//     return true
// }
// function isNotZero(value){
//     if(value==="0")
//         return false;
//     return true
// }
// function valueForAll()
// {
//     let isTabTip = false;
//     let tabTipValue = null
//     let tip = null
//     let tipAmountPerPersonCalc = null
//     let amountPerPersonCalc = null
//     tabTips.forEach(tabTip=>{
//         if(tabTip.checked){
            
//             isTabTip = true
//             tabTipValue = tabTip.value
//         }
//     })
    
//     if(isNotZero(bill.value)){

//         billError.classList.remove("error");
//         bill.classList.remove("form-error");
//     }
//     else{
//         billError.classList.add("error");
//         bill.classList.add("form-error");
//     }
//     if(isNotZero(people.value)){

//         peopleError.classList.remove("error");
//         people.classList.remove("form-error");
//     }
//     else{
//         people.classList.add("form-error");
//         peopleError.classList.add("error");
//     }
//     if(isTabTip){
//         tip = tabTipValue
//         if(isNotBlank(bill.value) && isNotBlank(people.value) ){
//             tipAmountPerPersonCalc = ((bill.value * tip)/100)/(people.value);
//             tipPerPerson.textContent = parseFloat(tipAmountPerPersonCalc).toFixed(2);
            
//             amountPerPersonCalc = (bill.value/people.value) + tipAmountPerPersonCalc;
            
//             amountPerPerson.textContent = parseFloat(amountPerPersonCalc).toFixed(2);
//         }
//     }
//     else{
//         tip = customTip.value
//         if(isNotBlank(bill.value) && isNotBlank(people.value) && isNotBlank(customTip.value) ){
//             tipAmountPerPersonCalc = ((bill.value * tip)/100)/(people.value);
//             tipPerPerson.textContent = parseFloat(tipAmountPerPersonCalc).toFixed(2);
            
//             amountPerPersonCalc = (bill.value/people.value) +tipAmountPerPersonCalc;
            
//             amountPerPerson.textContent = parseFloat(amountPerPersonCalc).toFixed(2);
//         }      
//     }
// }

// bill.addEventListener('input',e=>{
    
//     valueForAll();
// })
// people.addEventListener('input',e=>{
    
//     valueForAll();
// })
// tabTips.forEach(tabTip=>{

// tabTip.addEventListener('focus',e=>{
    
//     customTip.value = null
 
// })
// })

// tabTips.forEach(tabTip=>{

//     tabTip.addEventListener('change',e=>{
        
//         customTip.value = null
//         valueForAll();
//     })
//     })

// customTip.addEventListener('focus',e=>{
    
//     tabTips.forEach(tabTip=>{
//         tabTip.checked = false;
//     })
    
// })
// customTip.addEventListener('input',e=>{
    
//     valueForAll();
// })
// reset.addEventListener('click',e=>{
//     e.preventDefault();
//     document.querySelector('.tip-calculator__card').reset();
//     tipPerPerson.textContent = "0.00"
//     amountPerPerson.textContent = "0.00"
// })
