import { Card, Col, Form, Icon, Input, Row, Select, Tooltip, Typography } from "antd";
import "antd/dist/antd.css";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { registerNewEmployee } from "../../actions/employeeAction";
import { getAllRoles } from "../../actions/roleAction";
import { clearStateErrors } from "../../actions/surveyFormActions";
import Employee from "../../models/Employee";
import Role from "../../models/Role";
import AffixedButtons from "../Layout/AffixedButtons";
import "./RegisterEmployee.css";

export interface IRegisterEmployeeProps extends FormComponentProps, RouteComponentProps<any> {
	registerNewEmployee: typeof registerNewEmployee;
	getAllRoles: typeof getAllRoles;
	clearStateErrors: typeof clearStateErrors;
	roles: typeof Role[];
	errors: any;
	employeeToCreate: Employee;
}

export interface IRegisterEmployeeState {
	confirmDirty: boolean;
	passwordsMatch: boolean;
}

const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;
class RegisterEmployee extends React.Component<IRegisterEmployeeProps, IRegisterEmployeeState> {
	constructor(props: IRegisterEmployeeProps) {
		super(props);
		this.state = {
			confirmDirty: false,
			passwordsMatch: true
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.backToLogin = this.backToLogin.bind(this);
		this.generateEmployeeModel = this.generateEmployeeModel.bind(this);
		this.comparePasswords = this.comparePasswords.bind(this);
	}

	componentWillMount() {
		this.props.getAllRoles();
		console.log(this.props.roles);
		console.log(this.props);
	}

	componentWillUpdate() {
		if (Object.keys(this.props.errors).length !== 0) this.props.clearStateErrors();
	}

	generateEmployeeModel() {
		let username = this.props.form.getFieldValue("username");
		let name = this.props.form.getFieldValue("name");
		let password = this.props.form.getFieldValue("password");
		let confirm = this.props.form.getFieldValue("confirmPassword");
		let costCenter = this.props.form.getFieldValue("costCenter");
		let shift = this.props.form.getFieldValue("shift");
		let roleIdx = this.props.form.getFieldValue("role");
		let role = this.props.roles[roleIdx];

		let employeeModel = new Employee(name, username, password, confirm, costCenter, shift, role);
		console.log(employeeModel);
		return employeeModel;
	}

	backToLogin() {
		this.props.history.push("/login");
	}

	comparePasswords(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.target;
		if (!!value && this.props.form.getFieldValue("password") !== this.props.form.getFieldValue("confirmPassword")) {
			this.setState((state: any) => ({ passwordsMatch: false }));
		} else if (this.props.form.getFieldValue("password") === this.props.form.getFieldValue("confirmPassword")) {
			this.setState((state: any) => ({ passwordsMatch: true }));
		}
	}

	handleSubmit(e: React.FormEvent<EventTarget>) {
		e.preventDefault();
		let employeeModel = this.generateEmployeeModel();
		this.props.registerNewEmployee(employeeModel);
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 24 },
				md: { span: 24 },
				lg: { span: 4 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 24 },
				md: { span: 24 },
				lg: { span: 20 }
			}
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24
				},
				sm: {
					span: 24
				},
				md: {
					span: 24
				},
				lg: {
					span: 20,
					offset: 4
				}
			}
		};

		return (
			<Form {...formItemLayout} onSubmit={this.handleSubmit} colon={false}>
				<Row type="flex" justify="center" align="middle" style={{ width: "100vw", height: "100%", backgroundColor: "#f2f2f2" }}>
					<Col md={15} sm={22} xs={22}>
						<Card
							className="register-card"
							bordered={false}
							bodyStyle={{ padding: "24px 32px 0px 32px" }}
							title={
								<div style={{ display: "flex", justifyContent: "center", alignContent: "middle", wordWrap: "break-word" }}>
									<Typography.Title style={{ marginBottom: 0 }}>iSkill Registration</Typography.Title>
								</div>
							}
						>
							<Form.Item
								validateStatus={this.props.errors.name ? "error" : ""}
								help={this.props.errors.name}
								hasFeedback={true}
								label="Name"
							>
								{getFieldDecorator("name")(<Input />)}
							</Form.Item>
							<Form.Item
								validateStatus={this.props.errors.username ? "error" : ""}
								help={this.props.errors.username}
								hasFeedback={true}
								label="Username"
							>
								{getFieldDecorator("username")(<Input autoComplete="new-password" />)}
							</Form.Item>
							<Form.Item
								validateStatus={this.props.errors.password ? "error" : ""}
								help={this.props.errors.password}
								hasFeedback={true}
								label="Password"
							>
								{getFieldDecorator("password")(<Input.Password autoComplete="new-password" onBlur={this.comparePasswords} />)}
							</Form.Item>
							<Form.Item
								validateStatus={this.props.errors.confirmPassword || !this.state.passwordsMatch ? "error" : ""}
								help={this.state.passwordsMatch ? this.props.errors.confirmPassword : "Passwords do not match"}
								hasFeedback={true}
								label="Confirm Password"
							>
								{getFieldDecorator("confirmPassword", {})(<Input.Password onBlur={this.comparePasswords} />)}
							</Form.Item>
							<Form.Item
								validateStatus={this.props.errors.costCenter ? "error" : ""}
								help={this.props.errors.costCenter}
								hasFeedback={true}
								label={
									<span>
										Cost Center&nbsp;
										<Tooltip title="Enter your assigned Cost Center.">
											<Icon type="question-circle-o" />
										</Tooltip>
									</span>
								}
							>
								{getFieldDecorator("costCenter")(<Input />)}
							</Form.Item>

							<Form.Item
								validateStatus={this.props.errors.shift ? "error" : ""}
								help={this.props.errors.shift}
								hasFeedback={true}
								label="Shift"
							>
								{getFieldDecorator("shift", {})(
									<Select>
										<Option value="shift1">Shift 1</Option>
										<Option value="shift2">Shift 2</Option>
										<Option value="disabled" disabled>
											Disabled
										</Option>
										<Option value="Yiminghe">yiminghe</Option>
									</Select>
								)}
							</Form.Item>

							<Form.Item
								validateStatus={this.props.errors.role ? "error" : ""}
								help={this.props.errors.role}
								hasFeedback={true}
								label="Role"
							>
								{getFieldDecorator("role", {})(
									<Select>
										{this.props.roles.map((role: Role, index: number) => (
											<Select.Option key={role.roleId} value={index}>
												{role.name}
											</Select.Option>
										))}
									</Select>
								)}
							</Form.Item>

							<Form.Item {...tailFormItemLayout}>
								<AffixedButtons
									leftButtonText="Back to login"
									leftButtonOnClickFunction={this.backToLogin}
									leftButtonIconType="arrow-left"
									rightButtonText="Register"
									rightButtonOnSubmitFunction={this.handleSubmit}
									rightButtonIconType="user-add"
								/>
							</Form.Item>
						</Card>
					</Col>
				</Row>
			</Form>
		);
	}
}

const wrappedRegisterEmployee = Form.create({ name: "register" })(RegisterEmployee);

const mapStateToProps = (state: any) => ({
	errors: state.errors,
	roles: state.role.roles
});

//action creators
const mapDispatchToProps = {
	registerNewEmployee,
	getAllRoles,
	clearStateErrors
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedRegisterEmployee);
