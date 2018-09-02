import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin }) => (
	<div className="box-layout">
		<div className="box-layout__box">
			<h1 className="layout__title">Expensify</h1>
			<p>If its Expensive, write it down.</p>
			<button onClick={startLogin}>Login</button>
		</div>
	</div>
);

const mapDispatchToProps = dispatch => ({
	startLogin: () => dispatch(startLogin())
});

export default connect(
	undefined,
	mapDispatchToProps
)(LoginPage);
