// Background Changer
let body = document.querySelector("body");

let forest = document.getElementById("forest");
let alaska = document.getElementById("alaska");
let blank = document.getElementById("blank");


function backgroundValue(event){
    
    body.className = event.currentTarget.id;
}


// CLOCK TIMES

// 1. COUNT DOWN FROM DATE INPUT

// Issues: Button mashing creates more interval frequencies, solution? a reset button??
let inputValue = document.getElementById("inputName").value;
let inputField = document.getElementById("inputName");

let countTitle = document.getElementById("dateCountTitle");

inputField.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        setCount();
    }
});



function setCount(){
    
    // CREATING VARIABLE VS UPDATING VARIABLE 
    // inputValue must be made outside of the function otherwise a new variable will be "created" everysingle time and added onto the countdowndate variable rather than "updating" the variable.
    inputValue = document.getElementById("inputName").value;
    
    // Possible Issue: interval is being created every time  function is called vs updating 
    // create a condition here like in the countdown one to fix frequency?
    let startCount = setInterval(countingDown, 1000);

    function countingDown(){
        let countDownDate = new Date(inputValue).getTime();
        if(!isNaN(countDownDate) && inputValue.length >= 11){
            countTitle.innerText = inputValue;
            
            let timeNow = new Date().getTime();
            
            let distance = countDownDate - timeNow;
            
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / (1000));
        
            document.getElementById("inputDate").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
        } else {
            alert("Put in your date like this: (Oct 03 2021) or (October 03 2021)");
            document.getElementById("inputDate").innerHTML = "";
            // must clear out of interval or it will keep running the alert.
            clearInterval(startCount);
        }
        
    }

}
    

/* 2. HARD CODED COUNT DOWN DATE */ 
let startCount = setInterval(() => {
    let dateVariable = "Jan, 01 2022";
    let countDownDate = new Date(dateVariable).getTime();
    let timeNow = new Date().getTime();

    let distance = countDownDate - timeNow;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / (1000));

    document.getElementById("newYear").innerHTML = dateVariable;
    document.getElementById("date").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";

}, 1000);


/* 3. CURRENT TIME CODE */
function clockTime(){
    // time has to be iterated as well for the variables to be update real time. 
    let time = new Date();

    let currentTime = time.toLocaleTimeString();

    // toLocalTimeString
    document.getElementById("currentT").innerHTML = currentTime;
}

setInterval(clockTime, 1000);

// 4. General Count Down

// Default Time
let hoursD = 1;
let minutesD = 0;
let secondsD = 0;

let countDown;

// these are empty strings
let hoursValue = document.getElementById("inputHours");
let minutesValue = document.getElementById("inputMinutes");
let secondsValue = document.getElementById("inputSeconds");



function reset(){
    console.log("stopmyfunc ran");
    clearInterval(countDown)
}

function clockDown(event) {


    console.log(typeof(secondsValue.value))

    // reassign these to the value of the inputs
    // on the input make the default values 0
    let hoursD = parseInt(hoursValue.value);
    let minutesD = parseInt(minutesValue.value);
    let secondsD = parseInt(secondsValue.value);


    if(event.currentTarget.id === "start"){
        countDown = setInterval(startCountDown, 1000);
    }
    

    function startCountDown(){
        console.log("ran")

        secondsD -= 1;
        
        // adding 0 string
        if(secondsD < 10) {
            secondsD = "0" + secondsD;
        }
        
        // time change
        // must check if minutes isnt 0 otherwise it will make minutes -1 at the end of countdown
        if(secondsD == "0-1" && minutesD != "00"){
            secondsD = 59;
            minutesD --;
        }

        if(minutesD == "0" && hoursD != "00") {
            minutesD = 59;
            secondsD = 59;
            hoursD --;
        }

        // must specify string length unlike the seconds because the minuts and hours will continuosly add the 0 string

            if(minutesD < 10) {
                let s = minutesD.toString();
                if(s.length < 2){
                    minutesD = "0" + minutesD;  
                }
            }
        // hours & minutes is put at the end of the code to make sure that the 0 string is added when the hour changes from 04 to 03 instead of 04, 3, 03.
        if(hoursD < 10) {
            let s = hoursD.toString();
            if(s.length < 2){
            hoursD = "0" + hoursD;  
            }
        }

        // clear interval once time runs out 
        if(hoursD == 0 && minutesD == 0 && secondsD == "0-1"){
            alert("RING RING RING");
            document.getElementById("hoursDown").innerHTML = "00:";
            document.getElementById("minutesDown").innerHTML = "00:";
            document.getElementById("secondsDown").innerHTML = "00";
            clearInterval(countDown);
        } else {
            document.getElementById("hoursDown").innerHTML = hoursD + ":";
            document.getElementById("minutesDown").innerHTML = minutesD + ":";
            document.getElementById("secondsDown").innerHTML = secondsD;
        }

    }
    
}

// function for both buttons 
function hideBtn(event){

    let currentDisplay = window.getComputedStyle(event.currentTarget).getPropertyValue("display");
    
    if(currentDisplay === "inline-block" && event.currentTarget.id == "start"){
        document.getElementById("start").style.display = "none";
        document.getElementById("reset").style.display = "inline-block";
    } else if(currentDisplay === "inline-block" && event.currentTarget.id == "reset") {
        document.getElementById("start").style.display = "inline-block";
        document.getElementById("reset").style.display = "none";
    }
}

