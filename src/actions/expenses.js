import uuid from "uuid";
import database from "../firebase/firebase";

// ADD_EXPENSE
export const addExpense = expense => ({
	type: "ADD_EXPENSE",
	expense
});

//suport of async firebase calls
export const startAddExpense = (expenseData = {}) => {
	return dispatch => {
		//desturcture incoming
		const { description = "", note = "", amount = 0, createdAt = 0 } = expenseData;
		//create the final expense for firebase
		const expense = { description, note, amount, createdAt };

		//set to firebase ...
		return database
			.ref("expenses")
			.push(expense)
			.then(ref => {
				//then dispatch to the store
				dispatch(
					addExpense({
						id: ref.key,
						...expense
					})
				);
			});
	};
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
	type: "REMOVE_EXPENSE",
	id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
	type: "EDIT_EXPENSE",
	id,
	updates
});
