import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SecuredRoute = ({ component: Component, security, ...otherProps }: any) => (
	<Route
		{...otherProps}
		render={props =>
			security.isAuthenticated && security.user.role.name === "ROLE_MANAGER" ? <Component {...props} /> : <Redirect to="/unauthorised" />
		}
	/>
);

SecuredRoute.propTypes = {
	security: PropTypes.object.isRequired
};

const mapStateToProps = (state: any) => ({
	security: state.employee
});

export default connect(mapStateToProps)(SecuredRoute);
