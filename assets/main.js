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
var trainNames;
var destinations;
var frequencys = 0;
var trainTime;


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


    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
});

database.ref("/trainData").on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(childSnapshot.val().trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(firstTimeConverted, "minutes");
    console.log("DIFFERENCE IN TIME: " + (diffTime));

    // Time apart (remainder)
    var tRemainder = diffTime % childSnapshot.val().frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm a");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));


    var tableRow = $("<tr><td scope='col'>" + childSnapshot.val().TrainName + "</td>" +
        "<td scope='col'>" + childSnapshot.val().destinations + "</td>" +
        "<td scope='col'>" + childSnapshot.val().frequency + "</td>" +
        "<td scope='col'>" + nextTrain + "</td>" +
        "<td scope='col'>" + tMinutesTillTrain + "</td></tr>");


        $("#tableBody").append(tableRow);
    }, function (errorObject) {
        console.log("Errors handled:" + errorObject.code)
});








