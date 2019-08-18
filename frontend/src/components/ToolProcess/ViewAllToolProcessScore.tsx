import * as React from "react";
import { Button, Card, Table, Input, Icon, Form } from "antd";
import PageTitle from "../Layout/PageTitle";
import { getAllToolProcessScores, getAllToolProcess } from "../../actions/toolProcessActions";
import Employee from "../../models/Employee";
import Highlighter from "react-highlight-words";
import { connect } from "react-redux";
import Column from "antd/lib/table/Column";
import ColumnGroup from "antd/lib/table/ColumnGroup";

export interface IViewAllToolProcessScoreProps {
	getAllToolProcessScores: typeof getAllToolProcessScores;
	getAllToolProcess: typeof getAllToolProcess;
	errors: any;
	user: Employee;
	toolProcessScores: any;
	toolProcess: any;
}

export interface IViewAllToolProcessScoreState {
	searchText: string;
	filteredInfo: any;
}

class ViewAllToolProcessScore extends React.Component<IViewAllToolProcessScoreProps, IViewAllToolProcessScoreState> {
	constructor(props: IViewAllToolProcessScoreProps) {
		super(props);

		this.state = {
			searchText: "",
			filteredInfo: null
		};
	}
	// componentWillReceiveProps() {
	// 	if (this.props.user.employeeId !== undefined) {
	// 		this.props.getAllToolProcessScores(this.props.user.employeeId);
	// 	}
	// }
	componentWillMount() {
		// console.log(this.props.user);
		if (this.props.user.employeeId !== undefined) {
			this.props.getAllToolProcessScores(this.props.user.employeeId);
			this.props.getAllToolProcess();
		}
	}

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
		const dataSource = this.props.toolProcessScores;
		// if(dataSource != undefined) {

		// dataSource.push(this.props.toolProcessScores.employee.employeeId);
		// }
		console.log(this.props);
		console.log(dataSource);
		console.log(this.props.toolProcess);
		return (
			<div style={{ padding: "2vw 5vw 0 5vw" }}>
				<PageTitle>Score Summary (Highest score shown)</PageTitle>
				<Card>
					<Table
						dataSource={dataSource}
						onChange={this.handleChange}
						bordered
						scroll={{ x: "max-content" }}
						pagination={{ pageSize: 5, pageSizeOptions: ["5", "10", "15", "20"], showSizeChanger: true }}
					>
						<Column title={"Name"} dataIndex="employee.name" fixed="left" width={200} />
						{this.props.toolProcess.map((tool: any, index: number) => (
							<ColumnGroup title={tool.toolProcessName} key={`colgroup${index}`}>
								<Column title="Manager" dataIndex={`toolProcessScores[${tool.toolProcessName}].manager`} align="center" />
								<Column title="Self" dataIndex={`toolProcessScores[${tool.toolProcessName}].self`} align="center" />
							</ColumnGroup>
						))}
					</Table>
				</Card>
			</div>
		);
	}
}

const wrappedViewAllToolProcessScore = Form.create({ name: "view_all_tool_process_score" })(ViewAllToolProcessScore);

const mapStateToProps = (state: any) => ({
	errors: state.errors,
	user: state.employee.user,
	toolProcessScores: state.toolProcess.toolProcessScoreList,
	toolProcess: state.toolProcess.toolProcessList
});

const mapDispatchToProps = {
	getAllToolProcessScores,
	getAllToolProcess
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedViewAllToolProcessScore);
