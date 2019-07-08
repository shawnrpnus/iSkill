import * as React from "react";
import { Col, Input, Select, Radio, Icon } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import Form, { WrappedFormUtils } from "antd/lib/form/Form";
import { connect } from "react-redux";
import "./Question.css";
const { Option } = Select;

export interface IQuestionProps {
	form: WrappedFormUtils<any>;
	categoryId: number;
	questionId: number;
	errors: any;
	index: number;
	parentCategoryIndex: number;
}

export interface IQuestionState {
	lowerBoundOptions: Array<number>;
	upperBoundOptions: Array<number>;
	currentRadioOption: number;
}

class Question extends React.Component<IQuestionProps, IQuestionState> {
	constructor(props: IQuestionProps) {
		super(props);

		this.state = {
			lowerBoundOptions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			upperBoundOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			currentRadioOption: 1
		};

		this.upperBoundChange = this.upperBoundChange.bind(this);
		this.lowerBoundChange = this.lowerBoundChange.bind(this);
		this.onRadioChange = this.onRadioChange.bind(this);
		this.onTaskNameChange = this.onTaskNameChange.bind(this);
		this.loadRadioOptions = this.loadRadioOptions.bind(this);
	}

	lowerBoundChange(lowerBoundValue: number) {
		let newUpperBoundOptions: Array<number> = [];
		for (let i = lowerBoundValue + 1; i <= 10; i++) {
			newUpperBoundOptions.push(i);
		}
		let currentUpperBound =
			this.props.form.getFieldValue(
				`upperBound-${this.props.categoryId}-${this.props.questionId}`
			) <= lowerBoundValue
				? lowerBoundValue + 1
				: this.props.form.getFieldValue(
						`upperBound-${this.props.categoryId}-${this.props.questionId}`
				  );
		this.setState((prevState, props) => ({
			upperBoundOptions: newUpperBoundOptions,
			currentRadioOption: lowerBoundValue
		}));
		this.props.form.setFieldsValue({
			[`upperBound-${this.props.categoryId}-${
				this.props.questionId
			}`]: currentUpperBound
		});
	}

	upperBoundChange(upperBoundValue: number) {
		let newLowerBoundOptions: Array<number> = [];
		for (let i = 0; i < upperBoundValue; i++) {
			newLowerBoundOptions.push(i);
		}

		let currentLowerBound =
			this.props.form.getFieldValue(
				`lowerBound-${this.props.categoryId}-${this.props.questionId}`
			) >= upperBoundValue
				? upperBoundValue - 1
				: this.props.form.getFieldValue(
						`lowerBound-${this.props.categoryId}-${this.props.questionId}`
				  );
		this.setState((prevState, props) => ({
			lowerBoundOptions: newLowerBoundOptions,
			currentRadioOption: currentLowerBound
		}));
		this.props.form.setFieldsValue({
			[`lowerBound-${this.props.categoryId}-${
				this.props.questionId
			}`]: currentLowerBound
		});
	}

	onRadioChange(event: RadioChangeEvent) {
		this.setState((prevState, props) => ({
			currentRadioOption: +event.target.value
		}));
	}

	onTaskNameChange() {
		// TODO: Redux
	}

	loadRadioOptions() {
		let currentRadioOptions = [];
		for (
			let i = this.props.form.getFieldValue(
				`lowerBound-${this.props.categoryId}-${this.props.questionId}`
			);
			i <=
			this.props.form.getFieldValue(
				`upperBound-${this.props.categoryId}-${this.props.questionId}`
			);
			i++
		) {
			currentRadioOptions.push(i);
		}
		return currentRadioOptions;
	}

	public render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<React.Fragment key={this.props.questionId}>
				<Col sm={1} xs={2}>
					<Form.Item>
						<Icon type="menu" className="question-menu-icon" />
					</Form.Item>
				</Col>
				<Col sm={8} xs={14}>
					<Form.Item
						key={this.props.questionId}
						validateStatus={
							this.props.errors[
								`categories[${
									this.props.parentCategoryIndex
								}].questions[${this.props.index}].questionText`
							]
								? "error"
								: ""
						}
						help={
							this.props.errors[
								`categories[${
									this.props.parentCategoryIndex
								}].questions[${this.props.index}].questionText`
							]
						}
						hasFeedback={true}
					>
						{getFieldDecorator(
							`questionText-${this.props.categoryId}-${
								this.props.questionId
							}`
						)(<Input allowClear placeholder="Enter task name" />)}
					</Form.Item>
				</Col>
				<Col sm={2} xs={4}>
					<Form.Item key={this.props.questionId}>
						{getFieldDecorator(
							`lowerBound-${this.props.categoryId}-${
								this.props.questionId
							}`,
							{
								initialValue: 1
							}
						)(
							<Select onChange={this.lowerBoundChange}>
								{this.state.lowerBoundOptions.map(option => {
									return (
										<Option
											key={`lowerBound-${option}-${
												this.props.categoryId
											}-${this.props.questionId}`}
											value={option}
										>
											{option}
										</Option>
									);
								})}
							</Select>
						)}
					</Form.Item>
				</Col>
				<Col sm={2} xs={4}>
					<Form.Item key={this.props.questionId}>
						{getFieldDecorator(
							`upperBound-${this.props.categoryId}-${
								this.props.questionId
							}`,
							{
								initialValue: 5
							}
						)(
							<Select onChange={this.upperBoundChange}>
								{this.state.upperBoundOptions.map(option => {
									return (
										<Option
											key={`upperBound-${option}-${
												this.props.categoryId
											}-${this.props.questionId}`}
											value={option}
										>
											{option}
										</Option>
									);
								})}
							</Select>
						)}
					</Form.Item>
				</Col>
				<Col sm={10} xs={22} style={{ paddingLeft: "1vw" }}>
					<Form.Item>
						<Radio.Group
							value={this.state.currentRadioOption}
							buttonStyle="solid"
							onChange={this.onRadioChange}
						>
							{this.loadRadioOptions().map(option => {
								return (
									<Radio
										key={`radio-${option}-${this.props.categoryId}-${
											this.props.questionId
										}`}
										value={option}
									>
										{option}
									</Radio>
								);
							})}
						</Radio.Group>
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
