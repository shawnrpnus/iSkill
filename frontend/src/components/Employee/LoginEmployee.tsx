import * as React from "react";
import "antd/dist/antd.css";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { connect } from "react-redux";
import { getLoginDetails, logout } from "../../actions/employeeAction";
import { FormComponentProps } from "antd/lib/form";
import { RouteComponentProps, Redirect } from "react-router";
import "./LoginEmployee.css";
import Employee from "../../models/Employee";
import { Link, withRouter } from "react-router-dom";

export interface ILoginEmployeeProps extends FormComponentProps, RouteComponentProps<any> {
	getLoginDetails: typeof getLoginDetails;
	logout: typeof logout;
	errors: any;
	// employeeToCreate: Employee;
	employeeLoggedIn: Employee;
	auth: any;
}

export interface ILoginEmployeeState { }

class LoginEmployee extends React.Component<ILoginEmployeeProps, ILoginEmployeeState> {
	constructor(props: ILoginEmployeeProps) {
		super(props);
		this.state = {};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// To disabled submit button at the beginning.
		this.props.form.validateFields();
	}

	componentDidUpdate() {
		// 	if (this.props.auth.isAuthenticated) {

		// 	return <Redirect to="/" />
		//   }
	}

	handleSubmit(e: React.FormEvent<EventTarget>) {
		e.preventDefault();
		let username = this.props.form.getFieldValue("username");
		let password = this.props.form.getFieldValue("password");
		this.props.getLoginDetails(username, password, this.props.history);
	}
	hasErrors(fieldsError: any) {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}

	logout(e: any) {
		e.preventDefault();
		this.props.logout();
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { isAuthenticated } = this.props.auth;
		// console.log(isAuthenticated);
		// console.log(this.props.auth.isAuthenticated);
		// console.log(this.props);

		const userLinks = (
			<Redirect to="/" />
			// <Button>
			// 	<a onClick={this.logout.bind(this)}>Logout</a>
			// </Button>
		);

		const guestLinks = (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<Form.Item
					validateStatus={this.props.errors.username ? "error" : ""}
					help={this.props.errors.username}
					hasFeedback={true}
					
				>
					{getFieldDecorator("username")(
						<Input
							prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
							placeholder="Username"
						/>
					)}
				</Form.Item>
				<Form.Item
					validateStatus={this.props.errors.username ? "error" : ""}
					help={this.props.errors.password}
					hasFeedback={true}>
					{getFieldDecorator("password")(
						<Input
							prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
							type="password"
							placeholder="Password"
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator("remember", {
						valuePropName: "checked",
						initialValue: true
					})(<Checkbox>Remember me</Checkbox>)}
					<a className="login-form-forgot" href="/">
						Forgot password
							</a>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						onSubmit={this.handleSubmit}
					>
						Log in
							</Button>
					Or <a href="/register">register now!</a>
				</Form.Item>
			</Form>
		);

		return (
			<div>
				<div>
					{isAuthenticated ? userLinks : guestLinks}
					{/* {guestLinks} */}
				</div>
			</div>
		);
	}
}

const wrappedLoginEmployee = Form.create({ name: "login" })(LoginEmployee);

const mapStateToProps = (state: any) => ({
	errors: state.errors,
	auth: state.employee
});

//action creators
const mapDispatchToProps = {
	getLoginDetails,
	logout
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedLoginEmployee);
