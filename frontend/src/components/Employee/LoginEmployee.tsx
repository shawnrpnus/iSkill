import { Button, Checkbox, Form, Icon, Input, Card, Row, Col, Typography } from "antd";
import "antd/dist/antd.css";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router";
import { getLoginDetails, logout } from "../../actions/employeeAction";
import { clearStateErrors } from "../../actions/surveyFormActions";
import Employee from "../../models/Employee";
import "./LoginEmployee.css";
import { Link } from "react-router-dom";

export interface ILoginEmployeeProps extends FormComponentProps, RouteComponentProps<any> {
	getLoginDetails: typeof getLoginDetails;
	clearStateErrors: typeof clearStateErrors;
	errors: any;
	// employeeToCreate: Employee;
	employeeLoggedIn: Employee;
	auth: any;
}

export interface ILoginEmployeeState {}

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

	componentWillUpdate() {
		if (Object.keys(this.props.errors).length !== 0) this.props.clearStateErrors();
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

	render() {
		const { getFieldDecorator } = this.props.form;
		const { isAuthenticated } = this.props.auth;

		const userLinks = <Redirect to="/" />;

		const guestLinks = (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<Row type="flex" justify="center" align="middle" style={{ width: "100vw", height: "100vh", backgroundColor: "#f2f2f2" }}>
					<Col lg={10} md={18} sm={22} xs={22} style={{ padding: "24px" }}>
						<Card
							className="login-card"
							bordered={false}
							bodyStyle={{ padding: "24px 32px 16px 32px" }}
							title={
								<div style={{ display: "flex", justifyContent: "center", alignContent: "middle" }}>
									<Typography.Title style={{ marginBottom: 0 }}>iSkill</Typography.Title>
								</div>
							}
						>
							<Form.Item
								validateStatus={this.props.errors.username ? "error" : ""}
								help={this.props.errors.username}
								hasFeedback={true}
							>
								{getFieldDecorator("username", { initialValue: "" })(
									<Input size="large" prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Username" />
								)}
							</Form.Item>
							<Form.Item
								validateStatus={this.props.errors.password ? "error" : ""}
								help={this.props.errors.password}
								hasFeedback={true}
							>
								{getFieldDecorator("password")(
									<Input.Password
										size="large"
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
								})(
									<Button type="primary" size="large" htmlType="submit" className="login-form-button" onSubmit={this.handleSubmit}>
										Log in
									</Button>
								)}
								{/* <a className="login-form-forgot" href="/">
									Forgot password
								</a> */}
							</Form.Item>
							<Form.Item>
								<Button type="dashed" size="large" htmlType="button" className="login-form-button" style={{ marginTop: 0 }}>
									<Link to="/register">Don't have an account? Register</Link>
								</Button>
							</Form.Item>
						</Card>
					</Col>
				</Row>
			</Form>
		);

		return <div>{isAuthenticated ? userLinks : guestLinks}</div>;
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
	clearStateErrors
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedLoginEmployee);
