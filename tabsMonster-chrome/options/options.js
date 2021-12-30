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