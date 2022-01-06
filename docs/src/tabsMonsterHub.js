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
            return `${this.tabsMonsterHub[date.toLocaleDateString()]} tabs opened, ${date.toLocaleDateString('en-US', options)}`
        },
        getValue(date){
            return !this.tabsMonsterHub[date.toLocaleDateString()]
        }
    },
    mounted(){
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
        this.tabsMonsterHub = JSON.parse(localStorage.getItem('tabsMonster')).tabsMonsterHub.dates;
        this.gridDates = gridDates;
       
        


    }

  }
  
  Vue.createApp(Counter).mount('#counter')



