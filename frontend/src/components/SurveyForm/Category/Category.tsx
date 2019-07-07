import * as React from "react";
import { Card, Form, Input, Button, Icon, Row, Col, Tooltip } from "antd";
import Question from "../Question/Question";
import QuestionModel from "../../../models/Question";
import { WrappedFormUtils } from "antd/lib/form/Form";
import "./Category.css";

export interface ICategoryProps {
	form: WrappedFormUtils<any>;
	categoryId: number;
	removeCategory: Function;
}

export interface ICategoryState {
	questions: Array<number>;
	questionId: number;
}

export default class Category extends React.Component<ICategoryProps, ICategoryState> {
	constructor(props: ICategoryProps) {
		super(props);

		this.state = {
			questions: [],
			questionId: 0
		};

		this.addQuestion = this.addQuestion.bind(this);
		this.removeQuestion = this.removeQuestion.bind(this);
		this.removeSelf = this.removeSelf.bind(this);
	}

	addQuestion() {
		this.setState((prevState, props) => ({
			questions: prevState.questions.concat(prevState.questionId),
			questionId: prevState.questionId + 1
		}));
		console.log(this.state);
	}

	removeQuestion(questionId: number) {
		this.setState((prevState, props) => ({
			questions: prevState.questions.filter(element => element !== questionId)
		}));
	}

	removeSelf() {
		this.setState((prevState, props) => ({
			questions: []
		}));
		this.props.removeCategory(this.props.categoryId);
	}

	public render() {
		const { getFieldDecorator } = this.props.form;
		let questions = this.state.questions;
		return (
			<Card
				bordered={true}
				title={
					<Row>
						<Col span={22}>
							<Form.Item
								// validateStatus={
								// 	this.props.errors.surveyFormName ? "error" : ""
								// }
								// help={this.props.errors.surveyFormName}
								hasFeedback={true}
								style={{ marginBottom: "0" }}
							>
								{getFieldDecorator(
									`categoryName-${this.props.categoryId}`
								)(
									<Input
										placeholder="Enter category name"
										size="large"
									/>
								)}
							</Form.Item>
						</Col>
						<Col span={2} style={{ textAlign: "center" }}>
							<Form.Item style={{ marginBottom: "0" }}>
								<Tooltip title="Delete this category">
									<Icon
										className="dynamic-delete-button"
										type="minus-circle"
										onClick={() => this.removeSelf()}
									/>
								</Tooltip>
							</Form.Item>
						</Col>
					</Row>
				}
			>
				{questions.map(questionId => {
					return (
						<Row
							key={`questionRow-${questionId}`}
							type="flex"
							justify="space-between"
							align="middle"
						>
							<Question
								key={questionId}
								form={this.props.form}
								categoryId={this.props.categoryId}
								questionId={questionId}
							/>
							<Col span={2} style={{ textAlign: "center" }}>
								<Form.Item>
									<Tooltip title="Delete this question">
										<Icon
											className="dynamic-delete-button"
											type="minus-circle-o"
											onClick={() =>
												this.removeQuestion(questionId)
											}
										/>
									</Tooltip>
								</Form.Item>
							</Col>
						</Row>
					);
				})}
				<Button type="primary" onClick={this.addQuestion}>
					<Icon type="plus-circle" />
					Add task
				</Button>
			</Card>
		);
	}
}
