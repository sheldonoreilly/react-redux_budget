import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
	addExpense,
	editExpense,
	removeExpense,
	startAddExpense,
	setExpenses,
	startSetExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
	//take fixture data and put in proper format and set to firebase db
	const expenseData = {};
	//destructure
	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expenseData[id] = { description, note, amount, createdAt };
	});
	//set the expense data to fb
	database
		.ref("expenses")
		.set(expenseData)
		.then(() => done());
});

test("should setup remove expense action object", () => {
	const action = removeExpense({ id: "123abc" });
	expect(action).toEqual({
		type: "REMOVE_EXPENSE",
		id: "123abc"
	});
});

test("should setup edit expense action object", () => {
	const action = editExpense("123abc", { note: "New note value" });
	expect(action).toEqual({
		type: "EDIT_EXPENSE",
		id: "123abc",
		updates: {
			note: "New note value"
		}
	});
});

test("should setup add expense action object with provided values", () => {
	const action = addExpense(expenses[2]);
	expect(action).toEqual({
		type: "ADD_EXPENSE",
		expense: expenses[2]
	});
});

test("should add expense to database and store", done => {
	const store = createMockStore({});

	const expenseData = {
		description: "Car",
		amount: 4500,
		note: "new car!",
		createdAt: 1000
	};

	store
		.dispatch(startAddExpense(expenseData))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: "ADD_EXPENSE",
				expense: {
					id: expect.any(String),
					...expenseData
				}
			});

			//test the expense saved to firebase
			return database.ref(`expenses/${actions[0].expense.id}`).once("value");
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});
});

//test("should add expense with defaults to database and store", () => {});
// test('should setup add expense action object with default values', () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0
//     }
//   });
// });

test("should set up expense action object with data", () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: "SET_EXPENSES",
		expenses
	});
});

test("should fetch the expenses from firebase", done => {
	const store = createMockStore({});
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "SET_EXPENSES",
			expenses
		});
		done();
	});
});
