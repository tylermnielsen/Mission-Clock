
var target = new Date(
  2026, 4, 1, 12, 0, 0
); 

const sign = document.getElementsByClassName("punc")[0];

const time_elements = document.getElementById("time")
  .getElementsByClassName("text");

const week_element = document.getElementById("weeks")
  .getElementsByClassName("text")[0]; 

const day_element = document.getElementById("days")
  .getElementsByClassName("text")[0]; 

const SECOND_IN_MS = 1000; 
const MINUTE_IN_MS = SECOND_IN_MS * 60; 
const HOUR_IN_MS = MINUTE_IN_MS * 60; 
const DAY_IN_MS = HOUR_IN_MS * 24; 
const WEEK_IN_MS = DAY_IN_MS * 7; 

function updateClock() {
  let now = new Date(); 
  let diff_ms = now - target;
  
  if(diff_ms < 0){
    sign.textContent = "-"; 
  } else {
    sign.textContent = "+"; 
  } 

  diff_ms = Math.abs(diff_ms); 

  let weeks = Math.floor(diff_ms / WEEK_IN_MS); 
  diff_ms %= WEEK_IN_MS; 

  let days = Math.floor(diff_ms / DAY_IN_MS);
  diff_ms %= DAY_IN_MS; 

  let hours = Math.floor(diff_ms / HOUR_IN_MS); 
  diff_ms %= HOUR_IN_MS; 

  let minutes = Math.floor(diff_ms / MINUTE_IN_MS); 
  diff_ms %= MINUTE_IN_MS; 

  let seconds = Math.floor(diff_ms / SECOND_IN_MS); 
  diff_ms %= SECOND_IN_MS; 

  if(weeks != week_element.textContent){
    week_element.textContent = weeks;
  }
  if(days != day_element.textContent){
    day_element.textContent = days; 
  }
  if(time_elements[0].textContent != String(hours).padStart(2, '0')){
    time_elements[0].textContent = String(hours).padStart(2, '0'); 
  }

  if(time_elements[1].textContent != String(minutes).padStart(2, '0')) {
    time_elements[1].textContent = String(minutes).padStart(2, '0'); 
  }
  
  if(time_elements[2].textContent != String(seconds).padStart(2, '0')) {
    time_elements[2].textContent = String(seconds).padStart(2, '0');  
  }
}

const interval = setInterval(updateClock, 1000); 

function updateTarget(){
  let new_time = prompt("Enter new time in ISO string format: YYYY-MM-DDTHH:MM:SSZ (for UTC) or YYYY-MM-DDTHH:MM:SS-HH:MM (for other timezone)")
  if(new_time == null) return; 

  let new_target = new Date(new_time); 

  if(isNaN(new_target)) {
    alert("Error: Invalid date format"); 
    return; 
  }

  target = new_target
  document.cookie = `target=${new_time};`;
  updateClock(); 
  
}

function setup(){
  let cookie = decodeURIComponent(document.cookie); 
  console.log(cookie); 

  if(cookie.indexOf("target=") != -1){
    let target_string = cookie.substring(
      cookie.indexOf("target=") + "target=".length
    );
    console.log(target_string); 
    target = new Date(target_string); 
  }

  updateClock(); 
}