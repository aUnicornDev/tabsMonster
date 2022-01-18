const Counter = {
    data() {
      return {
        tabsMonsterHub:{

        },
        gridDates:[]
      }
    }
    ,
    methods:{
        getTooltipText(date){
            let options = { year: 'numeric', month: 'long', day: 'numeric' }
            return `${this.tabsMonsterHub[date.toLocaleDateString()]? this.tabsMonsterHub[date.toLocaleDateString()]: 0} tabs opened on ${date.toLocaleDateString('en-US', options)}`
        },
        getValue(date){
            return !this.tabsMonsterHub[date.toLocaleDateString()]
        },
        getBackgroundColor(date){
          let backgroundColor = "#ddd"
          styleObject = {
            backgroundColor: "#ddd",
          }
          if(this.tabsMonsterHub[date.toLocaleDateString()]>225){
            backgroundColor ="#389583"
          }
          else if(this.tabsMonsterHub[date.toLocaleDateString()]>75){
            
            backgroundColor ="#40BF8A"
          }
          else if(this.tabsMonsterHub[date.toLocaleDateString()]>25){
            
            backgroundColor ="#8DE4AF"
          }
          else if(this.tabsMonsterHub[date.toLocaleDateString()]>0){
            backgroundColor ="#EDF5E0"
          }
          styleObject.backgroundColor = backgroundColor;
          return styleObject;
        }
    },
    async mounted(){
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
        const today = new Date();
        const yearBeforeCount = today.getDate() -today.getDay() -364 ;
        let prevYearDate = new Date();
        prevYearDate.setDate(yearBeforeCount);
        console.log(prevYearDate)
        
        
        const gridDates = getDates(new Date(prevYearDate.getFullYear(),prevYearDate.getMonth() ,prevYearDate.getDate() ), new Date(today.getFullYear(),today.getMonth() ,today.getDate()))
        this.gridDates = gridDates;
        setTimeout(()=>{
          this.tabsMonsterHub = JSON.parse(localStorage.getItem('tabsMonster')).tabsMonsterHub.dates;

        },2000);
       
        


    }

  }
  
  Vue.createApp(Counter).mount('#counter')



