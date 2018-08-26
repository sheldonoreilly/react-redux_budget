import * as firebase from "firebase";
var config = {
	apiKey: "AIzaSyDlbB74UobOBTrXrasewy8h7mu6u31BEwM",
	authDomain: "rr-budget.firebaseapp.com",
	databaseURL: "https://rr-budget.firebaseio.com",
	projectId: "rr-budget",
	storageBucket: "rr-budget.appspot.com",
	messagingSenderId: "233069196525"
};
firebase.initializeApp(config);

const database = firebase.database();

//these are for practical reasons
export { firebase, database as default };
