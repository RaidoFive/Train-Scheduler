//Initialize Firebase
 var config = {
    apiKey: "AIzaSyD8ks_lILwHuc6iFPeQIo3YFFhYFnEKii4",
    authDomain: "train-schedule-46a07.firebaseapp.com",
    databaseURL: "https://train-schedule-46a07.firebaseio.com",
    projectId: "train-schedule-46a07",
    storageBucket: "train-schedule-46a07.appspot.com",
    messagingSenderId: "219145877018"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();
  var ref = database.ref();
//on click function
$("#submitBtn").on("click", function() {
//grabbing user submitted values
	var train = $("#trainNameForm").val().trim();
	var destination = $("#destinationForm").val().trim();
	var firstTime = $("#firstTimeForm").val().trim();
	var frequency = $("#frequencyForm").val().trim();
//creating an object for my table info
	var addTrain = {
		name: train,
		trainDestination: destination,
		trainTime: firstTime,
		trainFrequency: frequency
	};

	ref.push(addTrain);

	$("#trainNameForm").val("");
	$("#destinationForm").val("");
	$("#firstTimeForm").val("");
	$("#frequencyForm").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	console.log(childSnapshot.val());

	var train = childSnapshot.val().name;
	var destination = childSnapshot.val().trainDestination;
	var firstTime = childSnapshot.val().trainTime;
	var frequency = childSnapshot.val().trainFrequency;

	var momentOne = moment(firstTime, "HH:mm");
	var difference = moment().diff(momentOne, "minutes");
	var diffFrequency = difference % frequency;
	var frequencyDiff = frequency - diffFrequency;
	var nextArrival = moment().add(frequencyDiff, "minutes").format("HH:mm a");
	var minutesAway = frequencyDiff;
//send data to the tbody in my HTML
	$("#timeTable > tbody").append("<tr><td>" + train + "</td><td>" + 
		destination + "</td><td>" + frequency + "</td><td>" +
		 nextArrival + "</td><td>" + frequencyDiff + " minute(s)" + "</td></tr>");
});