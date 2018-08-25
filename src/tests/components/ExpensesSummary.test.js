import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";
import expenses from "../fixtures/expenses";

test("should correctly render ExpensesSummary with 1 expense", () => {
	const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235} />);
	expect(wrapper).toMatchSnapshot();
});

test("should correctly render ExpensesSummary with 1+ expenses", () => {
	const wrapper = shallow(<ExpensesSummary expenseCount={2} expensesTotal={666} />);
	expect(wrapper).toMatchSnapshot();
});
