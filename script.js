//|||||||||||||||||||||||||||->>  INITIALISATION  <<-|||||||||||||||||||||||||

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"]
const open = document.getElementById('open');
const close = document.getElementById('close');
const modalContainer = document.getElementById('modal-container');
const daysCountEl = document.getElementById("days-count-el")
const percentEl = document.getElementById("percent-el")
const tbodyEl = document.getElementById("tableEl")
const smallTableEl = document.getElementById("table-count")
const timeNowEl = document.getElementById("timeNow")
const todayDateEl = document.getElementById("today-date")
let dateNumberJS = new Date().getDate()
let monthNumberJS = new Date().getMonth()
let entryTime = new Date().getTime()
let dayNumber = 0
let fappedNumber = 0
let savedNumber = 0
let percent = 0
let hourToMs = 0
let lastEntryTime = 0
let streaks = 0
let myArray = []
let savedData = []

document.getElementById("fapped-btn").disabled = false //keep it true
document.getElementById("saved-btn").disabled = false //keep it true

//clock()
//timer()
showToday()
checkSavedArray() //  {       DO NOT CHANGE
buildTable(myArray)   //  { THE ORDER OF THESE

//|||||||||||||||||||||||||||->>  THE FUNCTIONLAND  <<-|||||||||||||||||||||||||

function fapped() { // When slipped btn is pressed
    var status = "Slipped"
    // console.log("Slipped pressed")
    fappedNumber += 1
    streaks = 0
    dayIncrement()
    percentCalc(status, dateNumberJS, monthNumberJS, entryTime)
    disableBtn()
    document.getElementById("demo").innerHTML = "Nooo King!💀😭 Dont throw<br> your crown like that"
}

function autoFapped(dateNumberJS, monthNumberJS, entryTime) { // When user misses a day
    var status = "Missed"
    //console.log("Auto Slipped pressed")
    fappedNumber += 1
    streaks = 0
    dayIncrement()
    percentCalc(status, dateNumberJS, monthNumberJS, entryTime)
}

function saved() { // When saved btn is pressed
    var status = "Saved"
    // console.log("saved pressed")
    savedNumber += 1
    streaks += 1
    dayIncrement()
    percentCalc(status, dateNumberJS, monthNumberJS, entryTime)
    disableBtn()
    document.getElementById("demo").innerHTML = "You're an ABSOLUTE GOD 🛐 <br> Keep up the good work!"
}

function dayIncrement() { // Manages the day count
    dayNumber = dayNumber + 1
    daysCountEl.innerText = "~ DAY " + dayNumber + " ~"
}

function percentCalc(status, dateNumberJS, monthNumberJS, entryTime) { // Calculates the percentage and updates the html
    // console.log("percent pressed")
    percent = savedNumber * 100 / dayNumber
    percentEl.innerText = "Hit Ratio 📈: " + percent.toFixed(2) + "%"
    addTable(status, dateNumberJS, monthNumberJS, entryTime)
    //addTable(status, dateNumberJS, monthNumberJS)
}

function addTable(status, dateNumberJS, monthNumberJS, entryTime) { // Pushes the data to ARRAY and stores the array locally
    myArray.push(
        {
            day: dayNumber,
            status: status,
            percent: percent.toFixed(2),
            fappedNumber: fappedNumber,
            savedNumber: savedNumber,
            dateNumber: dateNumberJS,
            monthNumber: monthNumberJS,
            entryTime: entryTime,
            streaks: streaks
        }
    )
    buildTable(myArray)
    localStorage.setItem("progressArray", JSON.stringify(myArray));
}

function disableBtn() { // Disables the buttons (when outside the time limit)
    document.getElementById("fapped-btn").disabled = true;
    document.getElementById("saved-btn").disabled = true;
    document.getElementById("demo").innerHTML = "Buttons are Disabled"
}

function enableBtn() { // Enables the buttons (when inside the time limit)
    document.getElementById("fapped-btn").disabled = false;
    document.getElementById("saved-btn").disabled = false;
    document.getElementById("demo").innerHTML = "Buttons are Enabled"
}

function checkSavedArray() { // Checks if the local array exists or not, if not creates an empty local array
    if (localStorage.getItem("progressArray") == null) {
        localStorage.setItem("progressArray", "[]")
        // console.log("Locale is null")
    } else {
        // console.log("Locale is NOt null")
        retrieveData()
    }
}

function retrieveData() { // Retrieves data from local storage and assigns it to respective variables
    savedData = JSON.parse(localStorage.getItem("progressArray"));
    myArray = savedData
    // console.log("retrieved data is called")
    lastEntryTime = savedData[savedData.length - 1].entryTime
    fappedNumber = savedData[savedData.length - 1].fappedNumber
    dayNumber = savedData[savedData.length - 1].day
    savedNumber = savedData[savedData.length - 1].savedNumber
    percent = savedData[savedData.length - 1].percent
    streaks = savedData[savedData.length - 1].streaks

    daysCountEl.innerText = "~ DAY " + (dayNumber + 1) + " ~" // to update the html upon starting
    percentEl.innerText = "Hit Ratio 📈: " + percent + "%"

    //Making sure you only get a single chance a day
    missingEntries()
    singleChance()
}

function buildTable(myArray) { // Pulls Data from ARRAY and Builds the table rows
    // console.log("Reached buildTable")
    tableEl.innerHTML = `<tr>
                            <th colspan="4">Daily Progress <span style="color:grey;">${streaks}🔥</span> </th>
                        </tr>
                        <tr>
                            <th><b>Day</b></th>
                            <th><b>Date</b></th>
                            <th><b>Status</b></th>
                            <th><b>Percent</b></th>
                        </tr>`
    // For loop
    for (var i = 0; i < myArray.length; i++) {
        // console.log("Reached buildTable loop")
        var row = `<tr>
                        <td> ${myArray[i].day}</td>
                        <td> ${myArray[i].dateNumber} ${months[myArray[i].monthNumber]}</td>
                        <td> ${myArray[i].status}</td>
                        <td> ${myArray[i].percent}</td>    
                  </tr>`
        tableEl.innerHTML += row
    }
    smallTableEl.innerHTML = `<tr>
                                <td>Slips = ${fappedNumber}</td>
                                <td>Saves = ${savedNumber}</td>
                              </tr>`
}

function missingEntries() { // Checks if the user has missed any past entries
    // console.log("missing entries called")
    let entryDifference = entryTime - lastEntryTime
    let dateRatio = (entryDifference / 86400000).toFixed(0)
    setTimeout(function () {
        while (dateRatio > 1) {
            // console.log(dateRatio)
            var date = new Date(lastEntryTime + 86400000);
            let tempDate = date.getDate()
            let tempMonth = date.getMonth()
            autoFapped(tempDate, tempMonth, date.getTime())
            // console.log(entryDifference);
            dateRatio = dateRatio - 1
            lastEntryTime += 86400000
        }
        lastEntryTime = 0
    }, 1000);
}

function singleChance() {  //Making sure you only get a single chance a day
    let dateCheck = savedData[savedData.length - 1].dateNumber
    let monthCheck = savedData[savedData.length - 1].monthNumber
    if (dateNumberJS == dateCheck && monthNumberJS == monthCheck) {
        // console.log("Dates matched 1")
        // console.log(dateNumberJS, months[monthNumberJS])
        disableBtn()
        document.getElementById("demo").innerHTML = "You're done for the day. <br> Come back Tomorrow!"
    }
}

function clr() { //Clears the data array

    if (confirm("ur deleting all the saved data\nu ok bro?")) {
        // console.log("pressed ok")
        localStorage.clear();
        location.reload()
    } else {
        // console.log("pressed cancel");
    }

}

function clock() {
    setInterval(function () {
        var time = new Date();
        var h = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: "numeric", hour12: true })
        timeNowEl.innerHTML = h
    }, 1000)
}

function showToday() {
    // console.log("showtoday")
    todayDateEl.innerHTML = `${months[monthNumberJS]} ${dateNumberJS}th`
}

function openModal() {
    modalContainer.classList.add('show');
}

function closeModal() {
    modalContainer.classList.remove('show');
}


if (sessionStorage.getItem("modal") == null) {
    sessionStorage.setItem("modal", "[]")
    openModal()
}



//|||||||||||||||||||||||||||>>  TIMER ALGORITHM  <<|||||||||||||||||||||||||//

//-------------------------- THE COUNTDOWN APPROACH >
/*
// Set the date we're counting down to
var countDownDate = new Date("May 26, 2022 17:00:00").getTime();
var countDownDate1 = new Date("May 26, 2022 17:00:00").getTime();
timerInactive()

// TIMER INACTIVE

function timerInactive() {
    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = "Button Disabled For <br>" + hours + " hours, " +
            minutes + " minutes, & " + seconds + " seconds";

        // If the count down is over, write some text
        if (distance < 1000) {
            clearInterval(x);
            document.getElementById("fapped-btn").disabled = false;
            document.getElementById("saved-btn").disabled = false;

        }
    }, 1000);
}

// TIMER ACTIVE

countDownDate1 = new Date(Date.now() + 10000).getTime();
function timerActive() {
    // console.log("timer Y called")
    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate1 - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = "Button Active For<br>" + hours + " hours, " +
            minutes + " minutes, & " + seconds + " seconds";

        // If the count down is over, write some text
        if (distance < 1000) {
            block(x)
            // console.log(distance)
            distance = 0
        }
    }, 1000);
}
function block(x) {
    clearInterval(x);
    document.getElementById("fapped-btn").disabled = true;
    document.getElementById("saved-btn").disabled = true;
    countDownDate = new Date(Date.now() + 82800000).getTime();
    timerInactive()
}
*/

//-------------- ALTERNATE APPROACH WITHOUT THE COUNTDOWN >
/*
function timer() {
    var checkHour = new Date().getHours()
    var checkMinutes = new Date().getMinutes()
    var hourNum = 17 // Give the Hour Number here
    if (checkHour == hourNum) {
        // console.log("if> true")
        // console.log(checkHour, checkMinutes)
        enableBtn()
    } else if (checkHour < hourNum) {
        // console.log("if> false, moved to else if")
        // console.log(checkHour, checkMinutes)
        disableBtn()
        document.getElementById("demo").innerHTML = "Buttons are Disabled until 5pm Today"
    } else if (checkHour > hourNum) {
        // console.log("if> false, moved to else if 2")
        // console.log(checkHour, checkMinutes)
        disableBtn()
        document.getElementById("demo").innerHTML = "Buttons are Disabled until 5pm Tomorrow"
    }
}
*/


// ---------------- The Sandbox --------------



