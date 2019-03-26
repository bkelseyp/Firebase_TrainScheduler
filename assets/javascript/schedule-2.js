    var config = {
        apiKey: "AIzaSyDgdtSyxfIMrf3-Zc1w0cjpUfNaQzQkpJE",
        authDomain: "bri-bee.firebaseapp.com",
        databaseURL: "https://bri-bee.firebaseio.com",
        projectId: "bri-bee",
        storageBucket: "bri-bee.appspot.com",
        messagingSenderId: "600035488196"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    $(document).ready(function () {
    // Submit Buttion Data
    $("#submit-bid").on("click", function (event) {
        event.preventDefault();
        // Get the input values
        var trainName = $("#train_name").val().trim();
        var desName = $("#destination_name").val().trim();
        var trainTime = moment($("#train_time").val().trim(), "HH:mm").subtract(1, "years").format("X");
        var minFrequency = parseInt($("#min_Frequency").val().trim());
        var currentTime = moment();

        console.log(trainName);
        console.log(desName);
        console.log(trainTime);
        console.log(minFrequency);
        console.log(currentTime);
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        database.ref().push({
            Train: trainName,
            Destination: desName,
            Time: trainTime,
            Freq: minFrequency
        });

        $("#train_name").val();
        $("#destination_name").val();
        $("#train_time").val();
        $("#min_Frequency").val();

        return false;
    });
    // section below pulls info from database to the doc window?
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        var trainName = childSnapshot.val().Train;
        var desName = childSnapshot.val().Destination;
        var trainTime = childSnapshot.val().Time;
        var minFrequency = childSnapshot.val().Freq;

        // calculations
		var curTrainTime = moment.unix(trainTime).format("hh:mm");
		var difference =  moment().diff(moment(curTrainTime),"minutes");
    	var trainRemain = difference % minFrequency;
        var minUntil = minFrequency - trainRemain;
        var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');
        
        $("#inputDataHere").append("<tr><td>" + trainName + "</td><td>" + desName + "</td><td>" + minFrequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");

    });


});

// Initial Values
var trainName = "";
var desName = "";
var trainTime = 0;
var minFrequency = 0;


// Whenever a user clicks the submit-bid

$("#submit-bid").on("click", function (event) {
    event.preventDefault();
    // Get the input values
    var trainName = $("#train_name").val().trim();
    var trainTime = parseInt($("#train_time").val().trim());
    var desName = $("#destination_name").val().trim();
    var minFrequency = parseInt($("#min_Frequency").val().trim());

    // Log the Bidder and Price (Even if not the highest)
    console.log(trainName);
    console.log(trainTime);
    console.log(desName);
    console.log(minFrequency);

    database.ref().push({
        train_name: trainName,
        train_time: trainTime,
        destination_name: desName,
        min_Frequency: minFrequency

    })
    return false;
});
// ==========================================================

// (TEST 2)
// First Train of the Day is 3:00 AM
// Assume Train comes every 7 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:21 -- 5 minutes away


// Solved Mathematically
// Test case 2:
// 16 - 00 = 16
// 16 % 7 = 2 (Modulus is the remainder)
// 7 - 2 = 5 minutes away
// 5 + 3:16 = 3:21

// Assumptions
var tFrequency = 3;

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years").format("X");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
