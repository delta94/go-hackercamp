import React from 'react'

import { isAuthenticated } from "../../utils/utils";
import { Redirect } from "react-router-dom";

import { createContact, getContactsFor } from '../../actions/index';

import { Form, Icon, Input, Button, Table, message } from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalAddContactForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    // this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        createContact(values).then(res => {
          message.success('create contact successfully', 2);
        }).catch(err => {
          console.log(err);
        });
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const nameError = isFieldTouched('name') && getFieldError('name');
    const phoneError = isFieldTouched('phone') && getFieldError('phone');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your friend\'s name!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Name"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={phoneError ? 'error' : ''} help={phoneError || ''}>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your friend\'s phone number!' }],
          })(
            <Input
              prefix={<Icon type="contacts" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              placeholder="Phone Number"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Add Contact
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedHorizontalAddContactForm = Form.create({ name: 'horizontal_login' })(HorizontalAddContactForm);



class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource : []
    }
  }

  _handleClick = () => {
    getContactsFor().then(res => {
      this.setState({
        dataSource: res
      })
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    if (!isAuthenticated()) {
      return <Redirect to="/login" />;
    }

    const columns = [
    {
      title: 'Index',
      dataIndex: 'ID',
      key: 'index',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    }];

    return (
      <div>
        <WrappedHorizontalAddContactForm />
        <Table dataSource={this.state.dataSource} columns={columns} pagination={{pageSize: 5}}/>
        <Button onClick={this._handleClick}> Refresh</Button>
      </div>

    )
  }
}



export default Home;
