import * as React from "react";
import { Form, Select, Table, Divider, Tag, Card, Input, Button, Icon, Typography, Col, Row } from 'antd';
import { connect } from 'react-redux';
import { FormComponentProps, WrappedFormUtils } from 'antd/lib/form/Form';
import { RouteComponentProps } from 'react-router';
import { getAllSurveyForms } from '../../actions/surveyFormActions';
import SurveyForm from "../../models/SurveyForm";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";




export interface IViewAllSurveyFormProps extends FormComponentProps, RouteComponentProps<any> {
  getAllSurveyForms: typeof getAllSurveyForms;
  surveyForms: typeof SurveyForm[];
}

export interface IViewAllSurveyFormState {
  searchText: string,
  filteredInfo: any
}

class ViewAllSurveyForm extends React.Component<IViewAllSurveyFormProps, IViewAllSurveyFormState> {
  constructor(props: IViewAllSurveyFormProps) {
    super(props);

    this.state = {
        searchText: '',
        filteredInfo: null,
    };
  }

  componentWillMount() {
    this.props.getAllSurveyForms();
    console.log(this.props);
    
      if(this.props.match) {
      }
  }

  componentDidMount() {
    console.log(this.props.surveyForms);
  }

  getColumnSearchProps = (dataIndex:string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters } : 
      {setSelectedKeys: Function, selectedKeys: Array<any>, confirm: any, clearFilters:any}) => (
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
          style={{ width: 188, marginBottom: 8, display: 'block' }}
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
    filterIcon: (filtered: any) => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value:any, record:any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        // setTimeout(() => this.state.searchInput.select());
      }
    },
    render: (text:string) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys: string[], confirm: () => void) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = (clearFilters: () => void) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleChange = (pagination: any, filters: any, sorter: any) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
    });
  };



  public render() {
    let filteredInfo:any = this.state;
    // let list = this.props.surveyForms.map(surveyFormItem => <li>{surveyFormItem}</li>)
    const dataSource = this.props.surveyForms;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'surveyFormId',
        key: 'surveyFormId',
        render: (text: any) => <Link to={'viewForm/' + text}>{text}</Link>
      },
      {
        title: 'Name',
        dataIndex: 'surveyFormName',
        key: 'surveyFormName',
        ...this.getColumnSearchProps('surveyFormName'),
      },
      {
        title: 'Created By',
        dataIndex: 'creator.name',
        filters: [{ text: 'Manager', value: 'Manager' }, { text: 'Manager 2', value: 'Manager 2' }],
        onFilter: (value:any, record:any) => record.creator.name.includes(value),
      },
      {
        title: 'Tool/Process',
        dataIndex: 'toolProcess.toolProcessName',
        filters: [{ text: 'Tool 1', value: 'Tool 1' }, { text: 'Tool 2', value: 'Tool 2' }],
        onFilter: (value:any, record:any) => record.toolProcess.toolProcessName.includes(value),
        // defaultSortOrder: "descend",
        // sorter: (a:any, b:any) => a.toolProcess.toolProcessName - b.toolProcess.toolProcessName,
      },
      {
        title: 'Evaluated',
        dataIndex: 'evaluations.length',
      },
      {
        title: 'Link',
        dataIndex: 'surveyFormId',
        key: 'surveyFormId',
        render: (text: any) => <Link to={'viewForm/' + text}><Button type="primary" shape="circle" icon="search"></Button></Link>
      },
    ];
    
    
    return (
      <div style={{ padding: "2vw 5vw 0 5vw" }}>
        <Row>
						<Col span={24}>
							<Typography.Title style={{ textAlign: "center" }}>
								View All Forms
							</Typography.Title>
							<hr />
						</Col>
					</Row>
        <Card>
          <Table rowKey="surveyFormId" dataSource={dataSource} columns={columns} onChange={this.handleChange}/>

        </Card>
        
      </div>
       );
  }
}




const wrappedViewAllSurveyForm = Form.create({ name: "view_all_survey_form" })(ViewAllSurveyForm);

const mapStateToProps = (state: any) => ({
  surveyForms: state.surveyForm.surveyForms
});

//action creators
const mapDispatchToProps= {
	getAllSurveyForms
};

export default connect(
    mapStateToProps,
	mapDispatchToProps
)(wrappedViewAllSurveyForm);
