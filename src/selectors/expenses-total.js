export default expenses => {
	if (expenses === 0) return 0;

	return expenses.map(expense => expense.amount).reduce((amount, currentValue) => amount + currentValue, 0);
};
