import * as React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { getLoginDetails } from '../../actions/employeeAction';
import { FormComponentProps } from "antd/lib/form";
import { RouteComponentProps } from 'react-router';
import './LoginEmployee.css'
import Employee from '../../models/Employee';

export interface ILoginEmployeeProps extends FormComponentProps, RouteComponentProps<any> {
  getLoginDetails: typeof getLoginDetails;
  errors: any;
  // employeeToCreate: Employee;
  employeeLoggedIn: Employee;
}

export interface ILoginEmployeeState {
}

class LoginEmployee extends React.Component<ILoginEmployeeProps, ILoginEmployeeState> {

  constructor(props: ILoginEmployeeProps) {
    super(props);
    this.state = {

    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit(e: React.FormEvent<EventTarget>) {
		e.preventDefault();
    let username = this.props.form.getFieldValue("username");
    let password = this.props.form.getFieldValue("password");
    this.props.getLoginDetails(username, password);

	}
  hasErrors(fieldsError: any) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
          </a>
              <Button type="primary" htmlType="submit" className="login-form-button" onSubmit={this.handleSubmit}>
                Log in
          </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const wrappedLoginEmployee = Form.create({ name: 'login' })(LoginEmployee);


const mapStateToProps = (state: any) => ({
  errors: state.errors
});

//action creators
const mapDispatchToProps = {
  getLoginDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrappedLoginEmployee);