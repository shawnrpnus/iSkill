import * as React from 'react';
import { Form, Card, Row, Col, Select, Button } from 'antd';
import { connect } from 'react-redux';
import { FormComponentProps } from "antd/lib/form";
import { RouteComponentProps } from 'react-router-dom';
import { getEmployeesForManager, setCurrentUser } from '../../actions/employeeAction';
import Employee from '../../models/Employee';
import { getAllSurveyForms } from '../../actions/surveyFormActions';
import SurveyForm from '../../models/SurveyForm';
import PageTitle from '../Layout/PageTitle';
import AffixedButtons from '../Layout/AffixedButtons';
import { EvaluationReqObject, CreateEvaluationRequest, AssignEvaluationRequest } from '../../models/CreateUpdateEvaluationRequest';
import { assignEvaluation } from '../../actions/evaluationActions';

export interface IAssignEvaluationProps extends FormComponentProps, RouteComponentProps {
  errors: any;
  employees: Array<Employee>;
  surveyForms: Array<SurveyForm>;
  user: Employee;
  getEmployeesForManager: typeof getEmployeesForManager;
  getAllSurveyForms: typeof getAllSurveyForms;
  setCurrentUser: typeof setCurrentUser;
  assignEvaluation: typeof assignEvaluation;
}

export interface IAssignEvaluationState {
}

class AssignEvaluation extends React.Component<IAssignEvaluationProps, IAssignEvaluationState> {
  constructor(props: IAssignEvaluationProps) {
    super(props);

    this.state = {
    }
    this.generateEvaluationAssignment = this.generateEvaluationAssignment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillMount() {
    // localStorage.setItem('jwtToken',token);
    let token = localStorage.getItem('jwtToken');
    let jwt = require('jsonwebtoken');
    console.log(jwt.decode(token)); //this returns employee object
    let thisUser: Employee = jwt.decode(token);
    console.log(thisUser.employeeId);
    let loggedInEmployeeId: number = thisUser.employeeId || 0;
    console.log(loggedInEmployeeId);
    this.props.getEmployeesForManager(loggedInEmployeeId);

    this.props.getAllSurveyForms();

    console.log(this.props);
  }

  generateEvaluationAssignment() {
    console.log(this.props.form.getFieldValue('evaluatees'));
    console.log(this.props.form.getFieldValue("surveyForm"));
    console.log(this.props.user);
  }

  handleSubmit(e: React.FormEvent<EventTarget>) {
		console.log("submit");
		e.preventDefault();
    //this.props.createEvaluation(this.generateCreateEvaluationRequest());
    let evaluateeEmployeeIds: Array<number> = this.props.form.getFieldValue("evaluatees");
    let surveyFormId: number = this.props.form.getFieldValue("surveyForm");
    let currentUserId: number = 0;
    if(this.props.user.employeeId != undefined) {
      currentUserId = this.props.user.employeeId;
    }
    let assignEvaluationRequest = new AssignEvaluationRequest(
      currentUserId,
      evaluateeEmployeeIds,
      evaluateeEmployeeIds,
      surveyFormId
    );

    this.props.assignEvaluation(assignEvaluationRequest);
  }

  public render() {
    // const { getFieldDecorator } = this.props.form;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form style={{ padding: "2vw 5vw 0 5vw" }} onSubmit={ this.handleSubmit }>
          <PageTitle>Assign Evaluation to Employees</PageTitle>
          <Card>
            <Row gutter={24} type="flex" justify="center">
              <Col sm={12} xs={24} style={{ textAlign: "center", fontSize: "24px" }}>
                <Form.Item
                  validateStatus={this.props.errors.evaluateeEmployeeIds ? "error" : ""}
                  help={this.props.errors.evaluateeEmployeeIds}
                  hasFeedback={true}
                  label="Select employees to assign self-evaluation:"
                >
                  {getFieldDecorator("evaluatees", {

                  })(
                    <Select mode="multiple" placeholder="Select Employee" size="large" style={{ width: "100%" }}>
                      {this.props.employees.map(employee => (
                        <Select.Option key={employee.username} value={employee.employeeId}>
                          {employee.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} style={{ textAlign: "center", fontSize: "24px" }}>
                <Form.Item
                  validateStatus={this.props.errors.surveyFormId ? "error" : ""}
                  help={this.props.errors.surveyFormId}
                  hasFeedback={true}
                  label="Select an evaluation form:"
                >
                  {getFieldDecorator("surveyForm", {

                  })(
                    <Select placeholder="Select Form" size="large" style={{ width: "100%" }}>
                      {this.props.surveyForms.map((surveyForm: SurveyForm) => (
                        <Select.Option key={surveyForm.surveyFormName} value={surveyForm.surveyFormId}>
                          {surveyForm.surveyFormName}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item style={{ textAlign: "right", marginTop: "10px" }}>
              <Button type='primary' onClick={this.handleSubmit}>
                Assign Employees
              </Button>
            </Form.Item>
          </Card>
        </Form>
      </div>
    );
  }
}


const wrappedAssignEval = Form.create({ name: "assign_evaluation" })(AssignEvaluation);

const mapStateToProps = (state: any) => ({
  errors: state.errors,
  employees: state.employee.employeesForManager,
  surveyForms: state.surveyForm.surveyForms,
  user: state.employee.user
});

const mapDispatchToProps = {
  getEmployeesForManager,
  getAllSurveyForms,
  setCurrentUser,
  assignEvaluation
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrappedAssignEval);