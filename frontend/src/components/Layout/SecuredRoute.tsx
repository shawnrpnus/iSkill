import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SecuredRoute = ({ component: Component, security, ...otherProps }: any) => (
	<Route {...otherProps} render={props => (security.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />)} />
);

SecuredRoute.propTypes = {
	security: PropTypes.object.isRequired
};

const mapStateToProps = (state: any) => ({
	security: state.employee
});

export default connect(mapStateToProps)(SecuredRoute);
