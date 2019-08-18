import * as React from "react";
import PageTitle from "../Layout/PageTitle";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import Employee from "../../models/Employee";
import Evaluation from "../../models/Evaluation";
import { Card, Table, Button, Input, Icon, Spin } from "antd";
import Column from "antd/lib/table/Column";
import { Link } from "react-router-dom";
import {
	getEvaluationsAssignedToEmployee,
	getEvaluationsAssignedByManager,
	getEvaluationsDoneByManager,
	clearViewingEvaluations
} from "../../actions/evaluationActions";
import Highlighter from "react-highlight-words";

var objectPath = require("object-path");

export interface IViewEvaluationsProps extends RouteComponentProps {
	user: Employee;
	evaluationsToView: Array<Evaluation>;
	getEvaluationsAssignedToEmployee: typeof getEvaluationsAssignedToEmployee;
	getEvaluationsAssignedByManager: typeof getEvaluationsAssignedByManager;
	getEvaluationsDoneByManager: typeof getEvaluationsDoneByManager;
	clearViewingEvaluations: typeof clearViewingEvaluations;
}

export interface IViewEvaluationsState {
	mode: string;
	searchText: string;
}

class ViewEvaluations extends React.Component<IViewEvaluationsProps, IViewEvaluationsState> {
	constructor(props: IViewEvaluationsProps) {
		super(props);

		this.state = {
			mode: "",
			searchText: ""
		};
	}

	componentWillMount() {
		const { pathname } = this.props.location;
		if (this.props.user.employeeId !== undefined) {
			const { employeeId } = this.props.user;
			if (pathname === "/evaluationsAssignedToMe") {
				this.props.getEvaluationsAssignedToEmployee(employeeId);
			} else if (pathname === "/evaluationsAssignedByMe") {
				this.props.getEvaluationsAssignedByManager(employeeId);
			} else if (pathname === "/evaluationsDoneByMe") {
				this.props.getEvaluationsDoneByManager(employeeId);
			}
		}
	}

	componentDidMount() {
		const { pathname } = this.props.location;
		this.setState({ mode: pathname });
	}

	componentWillUnmount() {
		this.props.clearViewingEvaluations();
	}

	getNameSorter(employeeType: string) {
		return {
			sorter: (a: any, b: any) => a[employeeType].name.localeCompare(b[employeeType].name),
			...this.getColumnSearchProps(`${employeeType}.name`)
		};
	}

	getColumnSearchProps(dataIndex: string) {
		return {
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters
			}: {
				setSelectedKeys: Function;
				selectedKeys: Array<any>;
				confirm: any;
				clearFilters: any;
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder={`Search`}
						value={selectedKeys[0]}
						onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
						onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
						style={{ width: 188, marginBottom: 8, display: "block" }}
					/>
					<Button
						type="primary"
						onClick={() => this.handleSearch(selectedKeys, confirm)}
						icon="search"
						size="small"
						style={{ width: 90, marginRight: 8 }}
					>
						Search
					</Button>
					<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
						Reset
					</Button>
				</div>
			),
			filterIcon: (filtered: any) => <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />,
			onFilter: (value: any, record: any) =>
				objectPath
					.get(record, dataIndex)
					.toString()
					.toLowerCase()
					.includes(value.toLowerCase()),
			render: (text: string) => (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[this.state.searchText]}
					autoEscape
					textToHighlight={text.toString()}
				/>
			)
		};
	}

	handleSearch = (selectedKeys: string[], confirm: Function) => {
		confirm();
		this.setState({ searchText: selectedKeys[0] });
	};

	handleReset = (clearFilters: Function) => {
		clearFilters();
		this.setState({ searchText: "" });
	};

	public render() {
		const dataSource: Array<Evaluation> | undefined = this.props.evaluationsToView || undefined;
		const title =
			this.state.mode === "/evaluationsAssignedToMe"
				? "Evaluations Assigned To Me"
				: this.state.mode === "/evaluationsAssignedByMe"
				? "Evaluations Assigned By Me"
				: "Evaluations Done By Me";
		return (
			<Spin spinning={this.props.evaluationsToView === undefined}>
				<div style={{ padding: "2vw 5vw 0 5vw" }}>
					<PageTitle>{title}</PageTitle>
					<Card>
						<Table
							dataSource={dataSource}
							bordered
							rowKey="evaluationId"
							pagination={{ pageSize: 5, pageSizeOptions: ["5", "10", "15", "20"], showSizeChanger: true }}
						>
							<Column
								title={"Name"}
								dataIndex="surveyForm.surveyFormName"
								sorter={(a: any, b: any) => a.surveyForm.surveyFormName.localeCompare(b.surveyForm.surveyFormName)}
								sortDirections={["descend", "ascend"]}
								{...this.getColumnSearchProps("surveyForm.surveyFormName")}
							/>
							<Column
								title={"Status"}
								dataIndex="status"
								filters={[
									{ text: "New", value: "NEW" },
									{ text: "Ongoing", value: "ONGOING" },
									{ text: "Completed", value: "COMPLETED" }
								]}
								onFilter={(value: any, record: any) => record.status.includes(value)}
							/>
							{this.state.mode === "/evaluationsAssignedToMe" ? (
								<Column title={"Assigned By"} dataIndex="creator.name" {...this.getNameSorter("creator")} />
							) : (
								""
							)}
							{this.state.mode === "/evaluationsAssignedByMe" ? (
								<Column title={"Assigned To"} dataIndex="evaluator.name" {...this.getNameSorter("evaluator")} />
							) : (
								""
							)}
							{this.state.mode === "/evaluationsDoneByMe" ? (
								<Column title={"Done For"} dataIndex="evaluatee.name" {...this.getNameSorter("evaluatee")} />
							) : (
								""
							)}
							<Column
								title={"Actions"}
								dataIndex="evaluationId"
								align="center"
								render={(evaluationId: string, record: any) => {
									if (record.status === "COMPLETED") {
										return (
											<Link to={"doAssignedEvaluation/" + evaluationId}>
												<Button type="primary" shape="circle" icon="search" />
											</Link>
										);
									} else {
										return (
											<Link to={"doAssignedEvaluation/" + evaluationId}>
												<Button type="primary" shape="circle" icon="edit" />
											</Link>
										);
									}
								}}
							/>
						</Table>
					</Card>
				</div>
			</Spin>
		);
	}
}

const mapStateToProps = (state: any) => ({
	user: state.employee.user,
	evaluationsToView: state.evaluation.evaluationsToView
});

const mapDispatchToProps = {
	getEvaluationsAssignedToEmployee,
	getEvaluationsAssignedByManager,
	getEvaluationsDoneByManager,
	clearViewingEvaluations
};

export default connect<{}, {}, IViewEvaluationsProps>(
	mapStateToProps,
	mapDispatchToProps
)(ViewEvaluations);
