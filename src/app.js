import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import getVisibleExpenses from "./selectors/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";
import LoadingPage from "./components/LoadingPage";

const store = configureStore();

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

let hasRendered = false;
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById("app"));
		hasRendered = true;
	}
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

//.auth() returns  all auth related functionality
//.onAuthStateChanged(user) flashes when user has gone from unauthed to vice-versa
firebase.auth().onAuthStateChanged(user => {
	if (user) {
		//dispatch the users login action
		store.dispatch(login(user.uid));
		//user has logged in
		//we need to fetch the loggedin users expenses
		store.dispatch(startSetExpenses()).then(() => {
			renderApp();
			//we only redirect if current location is login page
			if (history.location.pathname === "/") {
				history.push("/dashboard");
			}
		});
	} else {
		//user has logged out
		store.dispatch(logout());

		renderApp();
		history.push("/");
	}
});
