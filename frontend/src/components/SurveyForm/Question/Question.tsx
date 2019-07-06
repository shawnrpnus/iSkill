import * as React from "react";
import { Row, Col, Input, Select, Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
const { Option } = Select;

export interface IQuestionProps {}

export interface IQuestionState {
	lowerBoundOptions: Array<number>;
	upperBoundOptions: Array<number>;
	currentLowerBound: number;
	currentUpperBound: number;
	currentRadioOption: number;
}

export default class Question extends React.Component<IQuestionProps, IQuestionState> {
	constructor(props: IQuestionProps) {
		super(props);

		this.state = {
			lowerBoundOptions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			upperBoundOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			currentLowerBound: 1,
			currentUpperBound: 5,
			currentRadioOption: 1
		};

		this.upperBoundChange = this.upperBoundChange.bind(this);
		this.lowerBoundChange = this.lowerBoundChange.bind(this);
		this.onRadioChange = this.onRadioChange.bind(this);
	}

	lowerBoundChange(lowerBoundValue: number) {
		let newUpperBoundOptions: Array<number> = [];
		for (let i = lowerBoundValue + 1; i <= 10; i++) {
			newUpperBoundOptions.push(i);
		}
		this.setState((prevState, props) => ({
			upperBoundOptions: newUpperBoundOptions,
			currentLowerBound: lowerBoundValue,
			currentUpperBound:
				prevState.currentUpperBound <= lowerBoundValue
					? lowerBoundValue + 1
					: prevState.currentUpperBound,
			currentRadioOption: lowerBoundValue
		}));
	}

	upperBoundChange(upperBoundValue: number) {
		let newLowerBoundOptions: Array<number> = [];
		for (let i = 0; i < upperBoundValue; i++) {
			newLowerBoundOptions.push(i);
		}

		let currentLowerBound =
			this.state.currentLowerBound >= upperBoundValue
				? upperBoundValue - 1
				: this.state.currentLowerBound;
		this.setState((prevState, props) => ({
			lowerBoundOptions: newLowerBoundOptions,
			currentUpperBound: upperBoundValue,
			currentLowerBound: currentLowerBound,
			currentRadioOption: currentLowerBound
		}));
	}

	onRadioChange(event: RadioChangeEvent) {
		this.setState((prevState, props) => ({
			currentRadioOption: +event.target.value
		}));
	}

	public render() {
		let currentRadioOptions = [];
		for (
			let i = this.state.currentLowerBound;
			i <= this.state.currentUpperBound;
			i++
		) {
			currentRadioOptions.push(i);
		}
		return (
			<Row>
				<Col span={8}>
					<Input allowClear placeholder="Enter task name" />
				</Col>
				<Col span={2}>
					<Select
						value={this.state.currentLowerBound}
						onChange={this.lowerBoundChange}
					>
						{this.state.lowerBoundOptions.map(option => {
							return (
								<Option key={`lowerBound${option}`} value={option}>
									{option}
								</Option>
							);
						})}
					</Select>
				</Col>
				<Col span={2}>
					<Select
						value={this.state.currentUpperBound}
						onChange={this.upperBoundChange}
					>
						{this.state.upperBoundOptions.map(option => {
							return (
								<Option key={`upperBound${option}`} value={option}>
									{option}
								</Option>
							);
						})}
					</Select>
				</Col>
				<Col span={12} style={{ paddingLeft: "1vw" }}>
					<Radio.Group
						value={this.state.currentRadioOption}
						buttonStyle="solid"
						onChange={this.onRadioChange}
					>
						{currentRadioOptions.map(option => {
							return <Radio value={option}>{option}</Radio>;
						})}
					</Radio.Group>
				</Col>
			</Row>
		);
	}
}
