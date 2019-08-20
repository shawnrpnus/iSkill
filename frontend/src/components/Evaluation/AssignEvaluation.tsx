import { Affix, Button, Card, Col, Form, Row, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { getEmployeesForManager, setCurrentUser } from "../../actions/employeeAction";
import { assignEvaluation } from "../../actions/evaluationActions";
import { getAllSurveyForms } from "../../actions/surveyFormActions";
import Category from "../../models/Category";
import { AssignEvaluationRequest } from "../../models/CreateUpdateEvaluationRequest";
import Employee from "../../models/Employee";
import SurveyForm from "../../models/SurveyForm";
import { sortCategoriesByCategorySequence } from "../../utils/SurveyFormUtils";
import PageTitle from "../Layout/PageTitle";
import SurveyFormTemplate from "../SurveyForm/SurveyFormTemplate";

export interface IAssignEvaluationProps extends FormComponentProps, RouteComponentProps {
	errors: any;
	employees: Array<Employee>;
	surveyForms: Array<SurveyForm>;
	user: Employee;
	getEmployeesForManager: typeof getEmployeesForManager;
	getAllSurveyForms: typeof getAllSurveyForms;
	setCurrentUser: typeof setCurrentUser;
	assignEvaluation: typeof assignEvaluation;
}

export interface IAssignEvaluationState {}

class AssignEvaluation extends React.Component<IAssignEvaluationProps, IAssignEvaluationState> {
	constructor(props: IAssignEvaluationProps) {
		super(props);

		this.state = {};
		this.generateEvaluationAssignment = this.generateEvaluationAssignment.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		if (this.props.user.employeeId) {
			this.props.getEmployeesForManager(this.props.user.employeeId);
		}

		this.props.getAllSurveyForms();

		console.log(this.props);
	}

	generateEvaluationAssignment() {
		console.log(this.props.form.getFieldValue("evaluatees"));
		console.log(this.props.form.getFieldValue("surveyForm"));
		console.log(this.props.user);
	}

	handleSubmit(e: React.FormEvent<EventTarget>) {
		console.log("submit");
		e.preventDefault();

		let evaluateeEmployeeIds: Array<number> = this.props.form.getFieldValue("evaluatees");
		let surveyFormId: number = this.props.form.getFieldValue("surveyForm");
		let currentUserId: number = this.props.user.employeeId || 0;
		let assignEvaluationRequest = new AssignEvaluationRequest(currentUserId, evaluateeEmployeeIds, evaluateeEmployeeIds, surveyFormId);

		this.props.assignEvaluation(assignEvaluationRequest);
	}

	public render() {
		const { getFieldDecorator } = this.props.form;
		let surveyFormId = this.props.form.getFieldValue("surveyForm");
		let surveyFormName = "";
		let toolProcessName = "";
		let skillLevel = "";
		let categories: Array<Category> = [];
		if (surveyFormId !== undefined) {
			let chosenSurveyForm: SurveyForm | undefined = this.props.surveyForms.find(
				(surveyForm: SurveyForm) => surveyForm.surveyFormId === surveyFormId
			);
			if (chosenSurveyForm) {
				surveyFormName = chosenSurveyForm.surveyFormName;
				toolProcessName = chosenSurveyForm.toolProcess.toolProcessName;
				skillLevel = chosenSurveyForm.skillLevel;
				categories = sortCategoriesByCategorySequence(chosenSurveyForm.categories);
			}
		}
		return (
			<div>
				<Form style={{ padding: "2vw 5vw 0 5vw" }} onSubmit={this.handleSubmit}>
					<PageTitle>Assign Evaluation to Employees</PageTitle>
					<Card>
						<Row gutter={24} type="flex" justify="center">
							<Col sm={12} xs={24} style={{ textAlign: "center", fontSize: "24px" }}>
								<Form.Item
									validateStatus={this.props.errors.evaluateeEmployeeIds ? "error" : ""}
									help={this.props.errors.evaluateeEmployeeIds}
									hasFeedback={true}
									label="Select employees to assign self-evaluation:"
								>
									{getFieldDecorator("evaluatees", {})(
										<Select mode="multiple" placeholder="Select Employee" size="large" style={{ width: "100%" }}>
											{this.props.employees.map(employee => {
												if (Number(employee.employeeId) !== Number(this.props.user.employeeId)) {
													return (
														<Select.Option key={employee.username} value={employee.employeeId}>
															{employee.name}
														</Select.Option>
													);
												}
												return null;
											})}
										</Select>
									)}
								</Form.Item>
							</Col>
							<Col sm={12} xs={24} style={{ textAlign: "center", fontSize: "24px" }}>
								<Form.Item
									validateStatus={this.props.errors.surveyFormId ? "error" : ""}
									help={this.props.errors.surveyFormId}
									hasFeedback={true}
									label="Select an evaluation form:"
								>
									{getFieldDecorator("surveyForm", {})(
										<Select placeholder="Select Form" size="large" style={{ width: "100%" }}>
											{this.props.surveyForms.map((surveyForm: SurveyForm) => (
												<Select.Option key={surveyForm.surveyFormName} value={surveyForm.surveyFormId}>
													{surveyForm.surveyFormName}
												</Select.Option>
											))}
										</Select>
									)}
								</Form.Item>
							</Col>
						</Row>
						{surveyFormId !== undefined ? (
							<SurveyFormTemplate
								surveyFormName={surveyFormName}
								toolProcessName={toolProcessName}
								skillLevel={skillLevel}
								categories={categories}
								form={this.props.form}
								answers={undefined}
							/>
						) : (
							""
						)}
						<Form.Item style={{ textAlign: "right", marginTop: "10px" }}>
							<Row type="flex" justify="end" gutter={8}>
								<Col md={6} sm={8} xs={10}>
									<Affix offsetBottom={10}>
										<Button type="primary" htmlType="submit" size="large" block onSubmit={this.handleSubmit}>
											Assign Employees
										</Button>
									</Affix>
								</Col>
							</Row>
						</Form.Item>
					</Card>
				</Form>
			</div>
		);
	}
}

const wrappedAssignEval = Form.create({ name: "assign_evaluation" })(AssignEvaluation);

const mapStateToProps = (state: any) => ({
	errors: state.errors,
	employees: state.employee.employeesForManager,
	surveyForms: state.surveyForm.surveyForms,
	user: state.employee.user
});

const mapDispatchToProps = {
	getEmployeesForManager,
	getAllSurveyForms,
	setCurrentUser,
	assignEvaluation
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedAssignEval);
