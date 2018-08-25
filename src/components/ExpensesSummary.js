import React from "react";
import { connect } from "react-redux";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";

import numeral from "numeral";

export const ExpensesSummary = props => {
	const plural = props.expenseCount === 1 ? "expense" : "expenses";
	const total = numeral(props.expensesTotal / 100).format("$0,0.00");
	return (
		<div>
			<h1>
				Viewing {props.expenseCount} {plural} totalling {total}
			</h1>
		</div>
	);
};

const mapStateToProps = state => {
	const visibleExpenses = selectExpenses(state.expenses, state.filters);

	return {
		expenseCount: visibleExpenses.lenght,
		expensesTotal: selectExpensesTotal(visibleExpenses)
	};
};

export default connect(mapStateToProps)(ExpensesSummary);
