import * as React from "react";
import { Col, Input, Select, Radio, Icon } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import Form, { WrappedFormUtils } from "antd/lib/form/Form";
const { Option } = Select;

export interface IQuestionProps {
	form: WrappedFormUtils<any>;
	categoryId: number;
	questionId: number;
}

export interface IQuestionState {
	lowerBoundOptions: Array<number>;
	upperBoundOptions: Array<number>;
	currentRadioOption: number;
}

export default class Question extends React.Component<IQuestionProps, IQuestionState> {
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
				<Col span={1}>
					<Form.Item>
						<Icon type="menu" />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item key={this.props.questionId}>
						{getFieldDecorator(
							`questionText-${this.props.categoryId}-${
								this.props.questionId
							}`
						)(<Input allowClear placeholder="Enter task name" />)}
					</Form.Item>
				</Col>
				<Col span={2}>
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
				<Col span={2}>
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
				<Col span={9} style={{ paddingLeft: "1vw" }}>
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
