import * as React from "react";
import { connect } from "react-redux";
import { Layout, Form, Input, Select, Row, Col } from "antd";
import { FormComponentProps } from "antd/lib/form";
import "./CreateSurveyForm.css";
import Question from "./Question/Question";

export interface ICreateSurveyFormProps extends FormComponentProps {
	errors: any;
}

export interface ICreateSurveyFormState {}

class CreateSurveyForm extends React.Component<
	ICreateSurveyFormProps,
	ICreateSurveyFormState
> {
	constructor(props: ICreateSurveyFormProps) {
		super(props);

		this.state = {};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {}

	public render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} style={{ padding: "2vw 10vw 0 10vw" }}>
				<Row gutter={16}>
					<Col span={8}>
						<Form.Item
							// validateStatus={
							// 	this.props.errors.surveyFormName ? "error" : ""
							// }
							// help={this.props.errors.surveyFormName}
							hasFeedback={true}
						>
							{getFieldDecorator("surveyFormName")(
								<Input placeholder="Enter form name" size="large" />
							)}
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							// validateStatus={this.props.errors.toolProcess ? "error" : ""}
							// help={this.props.errors.toolProcess}
							hasFeedback={true}
						>
							{getFieldDecorator("toolProcess")(
								<Select
									placeholder="Select Tool / Process"
									size="large"
								/>
							)}
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							// validateStatus={this.props.errors.skillLevel ? "error" : ""}
							// help={this.props.errors.SkillLevel}
							hasFeedback={true}
						>
							{getFieldDecorator("skillLevel")(
								<Select placeholder="Select Skill Level" size="large" />
							)}
						</Form.Item>
					</Col>
				</Row>
				<hr />
				<Question />
			</Form>
		);
	}
}

const wrappedCreateSurveyForm = Form.create({ name: "create_survey_form" })(
	CreateSurveyForm
);
const mapStateToProps = (state: any) => ({});
const mapDispatchToProps = {};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedCreateSurveyForm);
