import expenses from "../fixtures/expenses";
import selectExpensesTotal from "../../selectors/expenses-total";

test("should add all expenses - with no expenses", () => {
	const total = selectExpensesTotal([]);
	expect(total).toEqual(0);
});

test("should add a single expense correcly", () => {
	const total = selectExpensesTotal(expenses.slice(0, 1));
	expect(total).toEqual(195);
});

test("should add all expenses correctly", () => {
	const total = selectExpensesTotal(expenses);
	expect(total).toEqual(114195);
});
