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
console.log($("#submitBtn"));
$("#submitBtn").on("click",function(event){
    event.preventDefault();

    // retreving train data from input
    trainNames = $("#trainName").val().trim();
    destinations = $("#destination").val().trim();
    trainTime = $("#firstTrainTime").val().trim();
    frequencys = $("#frequency").val().trim();

    // push to database
    database.ref("/trainData").set({
        TrainName:trainNames,
        destinations:destinations,
        trainTime: trainTime,
        frequency: frequencys
    });
    console.log(trainNames);
    console.log(destinations);
    console.log(trainTime);
    console.log(frequencys);
});

// javascript time math to determine how many minutes away the train is







