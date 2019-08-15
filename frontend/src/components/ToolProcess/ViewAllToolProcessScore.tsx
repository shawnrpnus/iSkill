import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Popconfirm, Card, Table, Input, Icon, Form, Typography } from 'antd';
import PageTitle from '../Layout/PageTitle';
import { getAllToolProcessScores, getAllToolProcess } from '../../actions/toolProcessActions';
import Employee from '../../models/Employee';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import Column from 'antd/lib/table/Column';
import employeeReducer from '../../reducers/employeeReducer';

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
		if(dataSource != undefined) {
			
		dataSource.push(this.props.toolProcess);
		}
		console.log(this.props);
		console.log(dataSource);
		console.log(this.props.toolProcess);

		// if(dataSource != undefined) {
		// // 	let tryThis:[] = dataSource[0].toolProcessScores;
		// // console.log(tryThis);
		// 	console.log(dataSource[0].toolProcessScores["Tool 1"].manager);
			
		// console.log(columnItems);
		// }
		
		const columns = [
			{
				title: "ID",
				dataIndex: "employee.employeeId",
				key: "employee.employeeId"
				// render: (text: any) => <Link to={"viewForm/" + text}>{text}</Link>
			},
			{
				title: "Name",
				dataIndex: "employee.name",
				key: "employee.name"
				// ...this.getColumnSearchProps("surveyFormName")
			},
			{
				title: "Tool 1",
				dataIndex: "toolProcessScores['Tool 1'].manager",
				// filters: [{ text: "New", value: "NEW" }, { text: "Ongoing", value: "ONGOING" }, { text: "Completed", value: "COMPLETED" }],
				// onFilter: (value: any, record: any) => record.status.includes(value)
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
				<PageTitle>View All Tool Process Scores</PageTitle>
				<Card>
					<Table rowKey="surveyFormId" dataSource={dataSource} columns={columns} onChange={this.handleChange} >
					{/* {this.props.toolProcess.map((tool:any) => */}
						<Column title={"Tool 13"} dataIndex={this.props.toolProcess} 
						/>
					{/* )} */}
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
