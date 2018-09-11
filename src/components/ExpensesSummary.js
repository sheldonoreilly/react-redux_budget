import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";

import numeral from "numeral";

export const ExpensesSummary = props => {
	const plural = props.expenseCount === 1 ? "expense" : "expenses";
	const total = numeral(props.expensesTotal / 100).format("$0,0.00");
	return (
		<div className="page-header">
			<div className="content-container">
				<h1 className="page-header__title">
					Viewing <span>{props.expenseCount}</span> {props.expenseword} {plural} totalling{" "}
					<span>{total}</span>
				</h1>
				<div className="page-header__actions">
					<Link className="button" to="/create">
						Add Expense
					</Link>
				</div>
			</div>
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
