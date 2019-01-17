var config = {
    apiKey: "AIzaSyDSYhc7VlQZo9LEbjZvBPojFJ7mv6gDiJg",
    authDomain: "class11418.firebaseapp.com",
    databaseURL: "https://class11418.firebaseio.com",
    projectId: "class11418",
    storageBucket: "class11418.appspot.com",
    messagingSenderId: "988664851163"
};

firebase.initializeApp(config);

var database = firebase.database();
//   variable for train name 
var trainNames;
//   variable for Destination
var destinations;
//   variable for Frequency
var frequencys = 0;
// train time
var trainTime;
//   variable for minutes away?


// On Click

$("#submitBtn").on("click", function (event) {
    event.preventDefault();

    // retreving train data from input
    trainNames = $("#trainName").val().trim();
    destinations = $("#destination").val().trim();
    trainTime = $("#firstTrainTime").val().trim();
    frequencys = $("#frequency").val().trim();

    // push to database look into push method
    database.ref("/trainData").push({
        "TrainName": trainNames,
        "destinations": destinations,
        "trainTime": trainTime,
        "frequency": frequencys
    });
    console.log(trainNames);
    console.log(destinations);
    console.log(trainTime);
    console.log(frequencys);

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
});

database.ref("/trainData").on("child_added", function (childSnapshot) {
    // var startingDate = snapshot.val().startdates;
    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequencys;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequencys - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    



    // var monthsWorked = moment().diff(startingDate, "months");

    // var totalBilled = monthsWorked * (snapshot.val().monthlyRates);


    var tableRow = $("<tr><td scope='col'>" + childSnapshot.val().TrainName + "</td>" +
        "<td scope='col'>" + childSnapshot.val().destinations + "</td>" +
        "<td scope='col'>" + childSnapshot.val().frequency + "</td>" +
        "<td scope='col'>" + "Next Arrival" + "</td>" +
        "<td scope='col'>" + "minuets away" + "</td></tr>");


    $("#tableBody").append(tableRow);
}, function (errorObject) {
    console.log("Errors handled:" + errorObject.code)
});

// javascript time math to determine how many minutes away the train is







