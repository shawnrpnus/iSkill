import { Button, Card, Form, Icon, Input, notification, Popconfirm, Table } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import * as React from "react";
import Highlighter from "react-highlight-words";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { deleteSurveyForm, getAllSurveyForms } from "../../actions/surveyFormActions";
import SurveyForm from "../../models/SurveyForm";
import PageTitle from "../Layout/PageTitle";
import Column from "antd/lib/table/Column";
import Employee from "../../models/Employee";

var objectPath = require("object-path");

export interface IViewAllSurveyFormProps extends FormComponentProps, RouteComponentProps<any> {
	getAllSurveyForms: typeof getAllSurveyForms;
	deleteSurveyForm: typeof deleteSurveyForm;
	surveyForms: typeof SurveyForm[];
	errors: any;
	user: Employee;
}

export interface IViewAllSurveyFormState {
	searchText: string;
	searchDataIndex: string;
}

class ViewAllSurveyForm extends React.Component<IViewAllSurveyFormProps, IViewAllSurveyFormState> {
	constructor(props: IViewAllSurveyFormProps) {
		super(props);

		this.state = {
			searchText: "",
			searchDataIndex: ""
		};
	}

	componentWillMount() {
		this.props.getAllSurveyForms();
		console.log(this.props);
		if (this.props.match) {
		}
	}

	componentDidMount() {
		console.log(this.props.surveyForms);
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
					placeholder={`Search`}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, dataIndex, confirm)}
					style={{ width: 188, marginBottom: 8, display: "block" }}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, dataIndex, confirm)}
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
				searchWords={this.state.searchDataIndex === dataIndex ? [this.state.searchText] : [""]}
				autoEscape
				textToHighlight={text.toString()}
			/>
		)
	});

	handleSearch = (selectedKeys: string[], dataIndex: string, confirm: Function) => {
		confirm();
		this.setState({ searchText: selectedKeys[0], searchDataIndex: dataIndex });
	};

	handleReset = (clearFilters: Function) => {
		clearFilters();
		this.setState({ searchText: "", searchDataIndex: "" });
	};

	deleteForm(surveyFormId: any) {
		this.props.deleteSurveyForm(surveyFormId, this.props.history);
	}

	openNotification = () => {
		notification.error({
			message: "An Error Occured While Deleting",
			description: this.props.errors.surveyFormCannotDelete
		});
	};

	public render() {
		const dataSource = this.props.surveyForms;
		if (this.props.errors.surveyFormCannotDelete) {
			this.openNotification();
		}
		return (
			<div style={{ padding: "2vw 5vw 0 5vw" }}>
				<PageTitle>View All Forms</PageTitle>
				<Card>
					<Table
						rowKey="surveyFormId"
						dataSource={dataSource}
						bordered
						pagination={{ pageSize: 5, pageSizeOptions: ["5", "10", "15", "20"], showSizeChanger: true }}
					>
						<Column
							title={"Name"}
							dataIndex="surveyFormName"
							sorter={(a: any, b: any) => a.surveyFormName.localeCompare(b.surveyFormName)}
							sortDirections={["descend", "ascend"]}
							{...this.getColumnSearchProps("surveyFormName")}
						/>
						<Column
							title={"Created By"}
							dataIndex="creator.name"
							sorter={(a: any, b: any) => a.creator.name.localeCompare(b.creator.name)}
							sortDirections={["descend", "ascend"]}
							{...this.getColumnSearchProps("creator.name")}
						/>
						<Column
							title={"Tool/Process"}
							dataIndex="toolProcess.toolProcessName"
							sorter={(a: any, b: any) => a.toolProcess.toolProcessName.localeCompare(b.toolProcess.toolProcessName)}
							sortDirections={["descend", "ascend"]}
							{...this.getColumnSearchProps("toolProcess.toolProcessName")}
						/>
						<Column
							title={"Evaluated"}
							dataIndex="evaluations.length"
							sorter={(a: any, b: any) => a.evaluations.length - b.evaluations.length}
							sortDirections={["descend", "ascend"]}
						/>
						<Column
							title={"Actions"}
							dataIndex="surveyFormId"
							align="center"
							render={(surveyFormId: any, record: SurveyForm) => (
								<React.Fragment>
									<Link to={"viewForm/" + surveyFormId}>
										<Button type="primary" shape="circle" icon="search" />
									</Link>
									&nbsp;
									{record.creator &&
									record.creator.employeeId &&
									Number(record.creator.employeeId) === Number(this.props.user.employeeId) ? (
										<Popconfirm
											title="Are you sure you want to delete this form?"
											onConfirm={() => this.deleteForm(surveyFormId)}
											okText="Yes"
											cancelText="No"
											placement="topRight"
										>
											<Button type="danger" shape="circle" icon="delete" />
										</Popconfirm>
									) : (
										""
									)}
								</React.Fragment>
							)}
						/>
					</Table>
				</Card>
			</div>
		);
	}
}

const wrappedViewAllSurveyForm = Form.create({ name: "view_all_survey_form" })(ViewAllSurveyForm);

const mapStateToProps = (state: any) => ({
	surveyForms: state.surveyForm.surveyForms,
	errors: state.errors,
	user: state.employee.user
});

//action creators
const mapDispatchToProps = {
	getAllSurveyForms,
	deleteSurveyForm
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(wrappedViewAllSurveyForm);
