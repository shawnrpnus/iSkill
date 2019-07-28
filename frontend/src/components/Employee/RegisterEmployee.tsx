import { Button, Checkbox, Form, Icon, Input, Select, Tooltip } from "antd";
import "antd/dist/antd.css";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { registerNewEmployee } from "../../actions/employeeAction";
import { getAllRoles } from "../../actions/roleAction";
import Employee from "../../models/Employee";
import Role from "../../models/Role";
import "./RegisterEmployee.css";

export interface IRegisterEmployeeProps extends FormComponentProps, RouteComponentProps<any> {
	registerNewEmployee: typeof registerNewEmployee;
	getAllRoles: typeof getAllRoles;
	roles: typeof Role[];
	errors: any;
	employeeToCreate: Employee;
}

export interface IRegisterEmployeeState {
	confirmDirty: boolean;
	autoCompleteResult: [];
}

const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;
class RegisterEmployee extends React.Component<IRegisterEmployeeProps, IRegisterEmployeeState> {
	constructor(props: IRegisterEmployeeProps) {
		super(props);
		this.state = {
			confirmDirty: false,
			autoCompleteResult: []
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.props.getAllRoles();
		console.log(this.props.roles);
		console.log(this.props);
	}

	componentDidMount() {
		// To disabled submit button at the beginning.
		this.props.form.validateFields();
	}

	generateEmployeeModel(isPreview: boolean) {
		let username = this.props.form.getFieldValue("username");
		let name = this.props.form.getFieldValue("name");
		let password = this.props.form.getFieldValue("password");
		let costCenter = this.props.form.getFieldValue("costCenter");
		let shift = this.props.form.getFieldValue("shift");
		let role = this.props.form.getFieldValue("role");
		let roleAct = this.props.roles[role - 1];

		let employeeModel = new Employee(name, username, password, costCenter, shift, roleAct);
		console.log(employeeModel);
		return employeeModel;
	}

	handleSubmit(e: React.FormEvent<EventTarget>) {
		e.preventDefault();
		let employeeModel = this.generateEmployeeModel(true);
		this.props.registerNewEmployee(employeeModel);
	}

	hasErrors(fieldsError: any) {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}

	handleConfirmBlur = (e: any) => {
		const { value } = e.target;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};

	compareToFirstPassword = (rule: any, value: any, callback: any) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue("password")) {
			callback("Two passwords that you enter is inconsistent!");
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule: any, value: any, callback: any) => {
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(["confirm"], { force: true });
		}
		callback();
	};

	handleWebsiteChange = (value: any) => {
		let autoCompleteResult: any;
		if (!value) {
			autoCompleteResult = [];
		} else {
			autoCompleteResult = [".com", ".org", ".net"].map(domain => `${value}${domain}`);
		}
		this.setState({ autoCompleteResult });
	};
	handleChange(value: any) {
		console.log(`selected ${value}`);
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		// const { autoCompleteResult } = this.state;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0
				},
				sm: {
					span: 16,
					offset: 8
				}
			}
		};
		// const prefixSelector = getFieldDecorator("prefix", {
		// 	initialValue: "86"
		// })(
		// 	<Select style={{ width: 70 }}>
		// 		<Option value="86">+86</Option>
		// 		<Option value="87">+87</Option>
		// 	</Select>
		// );

		// const websiteOptions = autoCompleteResult.map(website => (
		// 	<AutoCompleteOption key={website}>{website}</AutoCompleteOption>
		// ));

		return (
			<div style={{ padding: "24px" }}>
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<Form.Item label="Name">{getFieldDecorator("name")(<Input />)}</Form.Item>
					<Form.Item label="Username">{getFieldDecorator("username")(<Input />)}</Form.Item>
					<Form.Item label="Password" hasFeedback>
						{getFieldDecorator("password")(<Input.Password />)}
					</Form.Item>
					<Form.Item label="Confirm Password" hasFeedback>
						{getFieldDecorator("confirm", {
							rules: [
								{
									required: true,
									message: "Please confirm your password!"
								},
								{
									validator: this.compareToFirstPassword
								}
							]
						})(<Input.Password onBlur={this.handleConfirmBlur} />)}
					</Form.Item>
					<Form.Item
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
					{/* <Form.Item label="Habitual Residence">
                        {getFieldDecorator('residence', {
                            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                            rules: [
                                { type: 'array', required: true, message: 'Please select your habitual residence!' },
                            ],
                        })(<Cascader options={residences} />)}
                    </Form.Item> */}
					<Form.Item label="Shift">
						{getFieldDecorator("shift", {
							rules: [{ required: true, message: "Please input your designated shift!" }]
						})(
							<Select style={{ width: 120 }} onChange={this.handleChange}>
								<Option value="shift1">Shift 1</Option>
								<Option value="shift2">Shift 2</Option>
								<Option value="disabled" disabled>
									Disabled
								</Option>
								<Option value="Yiminghe">yiminghe</Option>
							</Select>
						)}
					</Form.Item>
					<Form.Item label="Role">
						{getFieldDecorator("role", {
							rules: [{ required: true, message: "Please input your designated shift!" }]
						})(
							<Select style={{ width: 120 }} onChange={this.handleChange}>
								{this.props.roles.map((role: Role) => (
									<Select.Option key={role.roleId} value={role.roleId}>
										{role.name}
									</Select.Option>
								))}
							</Select>
						)}
					</Form.Item>
					<Form.Item {...tailFormItemLayout}>
						{getFieldDecorator("agreement", {
							valuePropName: "checked"
						})(
							<Checkbox>
								I have read the <a href="/">agreement</a>
							</Checkbox>
						)}
					</Form.Item>
					<Form.Item {...tailFormItemLayout}>
						<Button type="primary" htmlType="submit" onSubmit={this.handleSubmit}>
							Register
						</Button>
					</Form.Item>
				</Form>
			</div>
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
	getAllRoles
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedRegisterEmployee);
