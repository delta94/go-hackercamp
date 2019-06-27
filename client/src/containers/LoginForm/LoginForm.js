
import React from 'react';
import './LoginForm.css';
import { Redirect } from 'react-router-dom';
import { authenticate } from '../../actions/index';
import { Form, Icon, Input, Button , message} from 'antd';
import { isAuthenticated } from '../../utils/utils';

class NormalLoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLogin: false
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        authenticate(values).then(res => {
          this.setState({isLogin: true });
        })
        .catch(err => {
          // console.log("Login failed: ", err);
          message.error('Login failed, your information not valid');
        })
      }
    });
  };

  render() {
    if(isAuthenticated()){
      return <Redirect to="/"/>
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="http://localhost:3000/register">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


export default WrappedNormalLoginForm;