import * as React from "react";
import { Row, Col, Input, Select, Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { WrappedFormUtils } from "antd/lib/form/Form";
const { Option } = Select;

export interface IQuestionProps {
	form: WrappedFormUtils<any>;
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
			this.props.form.getFieldValue("upperBound") <= lowerBoundValue
				? lowerBoundValue + 1
				: this.props.form.getFieldValue("upperBound");
		this.setState((prevState, props) => ({
			upperBoundOptions: newUpperBoundOptions,
			currentRadioOption: lowerBoundValue
		}));
		this.props.form.setFieldsValue({
			upperBound: currentUpperBound
		});
	}

	upperBoundChange(upperBoundValue: number) {
		let newLowerBoundOptions: Array<number> = [];
		for (let i = 0; i < upperBoundValue; i++) {
			newLowerBoundOptions.push(i);
		}

		let currentLowerBound =
			this.props.form.getFieldValue("lowerBound") >= upperBoundValue
				? upperBoundValue - 1
				: this.props.form.getFieldValue("lowerBound");
		this.setState((prevState, props) => ({
			lowerBoundOptions: newLowerBoundOptions,
			currentRadioOption: currentLowerBound
		}));
		this.props.form.setFieldsValue({
			lowerBound: currentLowerBound
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
			let i = this.props.form.getFieldValue("lowerBound");
			i <= this.props.form.getFieldValue("upperBound");
			i++
		) {
			currentRadioOptions.push(i);
		}
		return currentRadioOptions;
	}

	public render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Row>
				<Col span={8}>
					{getFieldDecorator("questionText")(
						<Input allowClear placeholder="Enter task name" />
					)}
				</Col>
				<Col span={2}>
					{getFieldDecorator("lowerBound", {
						initialValue: 1
					})(
						<Select onChange={this.lowerBoundChange}>
							{this.state.lowerBoundOptions.map(option => {
								return (
									<Option key={`lowerBound${option}`} value={option}>
										{option}
									</Option>
								);
							})}
						</Select>
					)}
				</Col>
				<Col span={2}>
					{getFieldDecorator("upperBound", {
						initialValue: 5
					})(
						<Select onChange={this.upperBoundChange}>
							{this.state.upperBoundOptions.map(option => {
								return (
									<Option key={`upperBound${option}`} value={option}>
										{option}
									</Option>
								);
							})}
						</Select>
					)}
				</Col>
				<Col span={12} style={{ paddingLeft: "1vw" }}>
					<Radio.Group
						value={this.state.currentRadioOption}
						buttonStyle="solid"
						onChange={this.onRadioChange}
					>
						{this.loadRadioOptions().map(option => {
							return (
								<Radio key={`radio${option}`} value={option}>
									{option}
								</Radio>
							);
						})}
					</Radio.Group>
				</Col>
			</Row>
		);
	}
}
