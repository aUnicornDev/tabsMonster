let isMovable = true;
let eyeBall = document.querySelector('.eye-ball');
let innerEyeBall = document.querySelector('.inner-eye-ball');
let monsterLogo = document.querySelector('.monster-logo');
monsterLogo.addEventListener('click',()=>{
  isMovable = !isMovable;
})
document.addEventListener('mousemove',(e)=>{
  let x = e.clientX * 100 / window.innerWidth +"%";
  let y = e.clientY * 100 / window.innerHeight +"%";
  
  if(isMovable){
    eyeBall.style.left = x;
    eyeBall.style.top = y;
    eyeBall.style.transform = "translate(-"+x+",-"+y+")"
    
  }
  // console.log(x,y)
})

document.addEventListener('mousemove',(e)=>{
  let x = e.clientX * 100 / window.innerWidth +"%";
  let y = e.clientY * 100 / window.innerHeight +"%";
  // if(x>y){
  //   x = y
  // }
  // else{
  //   y=x
  // }
   if(isMovable){
  innerEyeBall.style.left = x;
  innerEyeBall.style.top = y;
  innerEyeBall.style.transform = "translate(-"+x+",-"+y+")"
   }
})
