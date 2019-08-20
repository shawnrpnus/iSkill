import * as React from "react";
import { Col, Input, Select } from "antd";
import Form, { WrappedFormUtils } from "antd/lib/form/Form";
import { connect } from "react-redux";
import "./Question.css";
import QuestionModel from "../../../models/Question";
import NumericChoiceQuestion from "../../../models/NumericChoiceQuestion";
const { Option } = Select;

export interface IQuestionProps {
	form: WrappedFormUtils<any>;
	categoryId: number;
	questionId: number;
	errors: any;
	index: number;
	parentCategoryIndex: number;
	existingQuestionObj?: QuestionModel;
}

export interface IQuestionState {
	lowerBoundOptions: Array<number>;
	upperBoundOptions: Array<number>;
}

const COL_ONE_SIZE = 10;
const COL_TWO_SIZE = 4;
const COL_THREE_SIZE = 4;

class Question extends React.Component<IQuestionProps, IQuestionState> {
	constructor(props: IQuestionProps) {
		super(props);

		this.state = {
			lowerBoundOptions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			upperBoundOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		};

		this.upperBoundChange = this.upperBoundChange.bind(this);
		this.lowerBoundChange = this.lowerBoundChange.bind(this);
		this.loadRadioOptions = this.loadRadioOptions.bind(this);
	}

	lowerBoundChange(lowerBoundValue: number) {
		let newUpperBoundOptions: Array<number> = [];
		for (let i = lowerBoundValue + 1; i <= 10; i++) {
			newUpperBoundOptions.push(i);
		}
		let currentUpperBound =
			this.props.form.getFieldValue(`upperBound-${this.props.categoryId}-${this.props.questionId}`) <= lowerBoundValue
				? lowerBoundValue + 1
				: this.props.form.getFieldValue(`upperBound-${this.props.categoryId}-${this.props.questionId}`);
		this.setState((prevState, props) => ({
			upperBoundOptions: newUpperBoundOptions
		}));
		this.props.form.setFieldsValue({
			[`upperBound-${this.props.categoryId}-${this.props.questionId}`]: currentUpperBound
		});
	}

	upperBoundChange(upperBoundValue: number) {
		let newLowerBoundOptions: Array<number> = [];
		for (let i = 0; i < upperBoundValue; i++) {
			newLowerBoundOptions.push(i);
		}

		let currentLowerBound =
			this.props.form.getFieldValue(`lowerBound-${this.props.categoryId}-${this.props.questionId}`) >= upperBoundValue
				? upperBoundValue - 1
				: this.props.form.getFieldValue(`lowerBound-${this.props.categoryId}-${this.props.questionId}`);
		this.setState((prevState, props) => ({
			lowerBoundOptions: newLowerBoundOptions
		}));
		this.props.form.setFieldsValue({
			[`lowerBound-${this.props.categoryId}-${this.props.questionId}`]: currentLowerBound
		});
	}

	loadRadioOptions() {
		let currentRadioOptions = [];
		for (
			let i = this.props.form.getFieldValue(`lowerBound-${this.props.categoryId}-${this.props.questionId}`);
			i <= this.props.form.getFieldValue(`upperBound-${this.props.categoryId}-${this.props.questionId}`);
			i++
		) {
			currentRadioOptions.push(i);
		}
		return currentRadioOptions;
	}

	public render() {
		const { getFieldDecorator } = this.props.form;
		let existingQuestionObj = this.props.existingQuestionObj;
		return (
			<React.Fragment key={this.props.questionId}>
				<Col span={COL_ONE_SIZE}>
					<Form.Item
						key={this.props.questionId}
						validateStatus={
							this.props.errors[`categories[${this.props.parentCategoryIndex}].questions[${this.props.index}].questionText`]
								? "error"
								: ""
						}
						help={this.props.errors[`categories[${this.props.parentCategoryIndex}].questions[${this.props.index}].questionText`]}
						hasFeedback={true}
					>
						{getFieldDecorator(`questionText-${this.props.categoryId}-${this.props.questionId}`, {
							initialValue: existingQuestionObj ? existingQuestionObj.questionText : ""
						})(<Input.TextArea autosize placeholder="Enter task name" />)}
					</Form.Item>
				</Col>
				<Col span={COL_TWO_SIZE}>
					<Form.Item key={this.props.questionId}>
						{getFieldDecorator(`lowerBound-${this.props.categoryId}-${this.props.questionId}`, {
							initialValue:
								existingQuestionObj && existingQuestionObj.hasOwnProperty("lowerBound")
									? (existingQuestionObj as NumericChoiceQuestion).lowerBound
									: 1
						})(
							<Select onChange={this.lowerBoundChange}>
								{this.state.lowerBoundOptions.map(option => {
									return (
										<Option key={`lowerBound-${option}-${this.props.categoryId}-${this.props.questionId}`} value={option}>
											{option}
										</Option>
									);
								})}
							</Select>
						)}
					</Form.Item>
				</Col>
				<Col span={COL_THREE_SIZE}>
					<Form.Item key={this.props.questionId}>
						{getFieldDecorator(`upperBound-${this.props.categoryId}-${this.props.questionId}`, {
							initialValue:
								existingQuestionObj && existingQuestionObj.hasOwnProperty("upperBound")
									? (existingQuestionObj as NumericChoiceQuestion).upperBound
									: 5
						})(
							<Select onChange={this.upperBoundChange}>
								{this.state.upperBoundOptions.map(option => {
									return (
										<Option key={`upperBound-${option}-${this.props.categoryId}-${this.props.questionId}`} value={option}>
											{option}
										</Option>
									);
								})}
							</Select>
						)}
					</Form.Item>
				</Col>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	errors: state.errors
});

export default connect(
	mapStateToProps,
	null
)(Question);
