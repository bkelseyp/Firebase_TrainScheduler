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
        console.log(moment(trainTime, "HH:mm").subtract(1, "years").format("X"));
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

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
    database.ref().on("child_added", function (childSnapshot) {

        var trainName = childSnapshot.val().Train;
        var desName = childSnapshot.val().Destination;
        var trainTime = childSnapshot.val().Time;
        var minFrequency = childSnapshot.val().Freq;

        // calculations
        var curTrainTime = moment();
        // moment.unix(trainTime).format("hh:mm");
        var difference = moment().diff(moment(trainTime), "minutes");
        var trainRemain = difference % minFrequency;
        var minUntil = minFrequency - trainRemain;
        var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

        // var tRemainder = diffTime % tFrequency;
        // var tMinutesTillTrain = tFrequency - tRemainder;
        // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        // console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
        
        $("#inputDataHere").append("<tr><td>" + trainName + "</td><td>" + desName + "</td><td>" + minFrequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");
    });
});

// Initial Values
var trainName = "";
var desName = "";
var trainTime = 0;
var minFrequency = 0;