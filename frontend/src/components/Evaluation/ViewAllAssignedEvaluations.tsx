import * as React from "react";
import { Form, Button, Popconfirm, Card, Table, Icon, Input } from "antd";
import { connect } from "react-redux";
import { getEvaluationsAssignedToEmployee } from "../../actions/evaluationActions";
import { Link } from "react-router-dom";
import Evaluation from "../../models/Evaluation";
import PageTitle from "../Layout/PageTitle";
import Employee from "../../models/Employee";
import Highlighter from "react-highlight-words";

export interface IViewAllAssignedEvalutionsProps {
	getAssignedEvaluations: typeof getEvaluationsAssignedToEmployee;
	errors: any;
	assignedEvaluations: Array<Evaluation>;
	user: Employee;
}

export interface IViewAllAssignedEvalutionsState {
	searchText: string;
	filteredInfo: any;
}

class ViewAllAssignedEvalutions extends React.Component<IViewAllAssignedEvalutionsProps, IViewAllAssignedEvalutionsState> {
	constructor(props: IViewAllAssignedEvalutionsProps) {
		super(props);

		this.state = {
			searchText: "",
			filteredInfo: null
		};
	}

	componentWillMount() {
		// console.log(this.props.user);
		if (this.props.user.employeeId !== undefined) {
			this.props.getAssignedEvaluations(this.props.user.employeeId);
		}
	}

	//returns props of filterDropdown, filterIcon, onFilter, onFilterDropdownVisiblechange, render
	getColumnSearchProps = (dataIndex: string) => ({
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
					// ref={node => {
					//   this.setState({ searchInput: node });
					// }}
					// placeholder={`Search ${dataIndex}`}
					placeholder={`Search Surveys`}
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
			value
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible: any) => {
			if (visible) {
				// setTimeout(() => this.state.searchInput.select());
			}
		},
		render: (text: string) => (
			<Highlighter
				highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
				searchWords={[this.state.searchText]}
				autoEscape
				textToHighlight={text.toString()}
			/>
		)
	});

	handleSearch = (selectedKeys: string[], confirm: () => void) => {
		confirm();
		this.setState({ searchText: selectedKeys[0] });
	};

	handleReset = (clearFilters: () => void) => {
		clearFilters();
		this.setState({ searchText: "" });
	};

	handleChange = (pagination: any, filters: any, sorter: any) => {
		console.log("Various parameters", pagination, filters, sorter);
		this.setState({
			filteredInfo: filters
		});
	};

	public render() {
		const dataSource = this.props.assignedEvaluations;
		console.log(this.props);
		console.log(dataSource);
		const columns = [
			{
				title: "ID",
				dataIndex: "evaluationId",
				key: "evaluationId"
				// render: (text: any) => <Link to={"viewForm/" + text}>{text}</Link>
			},
			{
				title: "Name",
				dataIndex: "surveyForm.surveyFormName",
				key: "surveyFormName"
				// ...this.getColumnSearchProps("surveyFormName")
			},
			{
				title: "Status",
				dataIndex: "status",
				filters: [{ text: "New", value: "NEW" }, { text: "Ongoing", value: "ONGOING" }, { text: "Completed", value: "COMPLETED" }],
				onFilter: (value: any, record: any) => record.status.includes(value)
			},
			{
				title: "Actions",
				dataIndex: "evaluationId",
				key: "actions",
				render: (evaluationId: any) => (
					<React.Fragment>
						<Link to={"doAssignedEvaluation/" + evaluationId}>
							<Button type="primary" shape="circle" icon="search" />
						</Link>
						&nbsp;
						<Popconfirm title="Are you sure you want to delete this form?" okText="Yes" cancelText="No" placement="topRight">
							<Button type="danger" shape="circle" icon="delete" />
						</Popconfirm>
					</React.Fragment>
				)
			}
		];
		return (
			<div style={{ padding: "2vw 5vw 0 5vw" }}>
				<PageTitle>View All Assigned Evaluations</PageTitle>
				<Card>
					<Table rowKey="surveyFormId" dataSource={dataSource} columns={columns} onChange={this.handleChange} />
				</Card>
			</div>
		);
	}
}

const wrappedViewAllAssignedEval = Form.create({ name: "view_all_assigned_evaluations" })(ViewAllAssignedEvalutions);

const mapStateToProps = (state: any) => ({
	errors: state.errors,
	user: state.employee.user,
	assignedEvaluations: state.evaluation.assignedEvaluations
});

const mapDispatchToProps = {
	getAssignedEvaluations: getEvaluationsAssignedToEmployee
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedViewAllAssignedEval);
