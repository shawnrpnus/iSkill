import * as React from "react";
import { Form, Row, Col, Typography, Select, Card, Input } from "antd";
import SurveyFormTemplate from "../SurveyForm/SurveyFormTemplate";
import { connect } from "react-redux";
import { FormComponentProps } from "antd/lib/form";
import Employee from "../../models/Employee";
import { getEmployeesForManager } from "../../actions/employeeAction";

export interface ICreateEvaluationProps extends FormComponentProps {
	errors: any;
	employees: Array<Employee>;
	getEmployeesForManager: typeof getEmployeesForManager;
}

export interface ICreateEvaluationState {}

class CreateEvaluation extends React.Component<ICreateEvaluationProps, ICreateEvaluationState> {
	constructor(props: ICreateEvaluationProps) {
		super(props);

		this.state = {};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.props.getEmployeesForManager(1); // TODO: Use dynamic id based on who is logged in
	}

	handleSubmit() {}

	public render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} style={{ padding: "2vw 5vw 0 5vw" }}>
				<Row>
					<Col span={24}>
						<Typography.Title style={{ textAlign: "center" }}>
							Creating Evaluation
						</Typography.Title>
						<hr />
					</Col>
				</Row>
				<Card
					title={
						<Row gutter={24} type="flex" justify="center">
							<Col sm={12} xs={24} style={{ textAlign: "center", fontSize: "24px" }}>
								<Form.Item
									validateStatus={this.props.errors.evaluatee ? "error" : ""}
									help={this.props.errors.evaluatee}
									hasFeedback={true}
									label="Select an employee to evaluate:"
								>
									{getFieldDecorator("evaluatee", {})(
										<Select
											placeholder="Select Employee"
											size="large"
											style={{ width: "100%" }}
										>
											{this.props.employees.map(employee => (
												<Select.Option
													key={employee.username}
													value={employee.employeeId}
												>
													{employee.name}
												</Select.Option>
											))}
										</Select>
									)}
								</Form.Item>
							</Col>
							<Col sm={12} xs={24} style={{ textAlign: "center", fontSize: "24px" }}>
								<Form.Item
									validateStatus={this.props.errors.surveyForm ? "error" : ""}
									help={this.props.errors.surveyForm}
									hasFeedback={true}
									label="Select an evaluation form:"
								>
									{getFieldDecorator("surveyForm", {})(
										<Select
											placeholder="Select Form"
											size="large"
											style={{ width: "100%" }}
										>
											{this.props.employees.map(employee => (
												<Select.Option
													key={employee.username}
													value={employee.employeeId}
												>
													{employee.name}
												</Select.Option>
											))}
										</Select>
									)}
								</Form.Item>
							</Col>
							<Col span={24} style={{ textAlign: "center" }}>
								<Form.Item
									validateStatus={this.props.errors.remarks ? "error" : ""}
									help={this.props.errors.remarks}
									hasFeedback={true}
									label="Remarks:"
								>
									{getFieldDecorator("remarks", {})(
										<Input.TextArea autosize={{ minRows: 2 }} />
									)}
								</Form.Item>
							</Col>
						</Row>
					}
				/>

				{/* <SurveyFormTemplate /> */}
			</Form>
		);
	}
}

const wrappedCreateEval = Form.create({ name: "create_evaluation" })(CreateEvaluation);

const mapStateToProps = (state: any) => ({
	errors: state.errors,
	employees: state.employee.employeesForManager
});

const mapDispatchToProps = {
	getEmployeesForManager
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedCreateEval);
