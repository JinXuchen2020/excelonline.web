import { Button, Form, Input, message, Image, Space, Col, Row } from 'antd';
import { USER_PROFILE } from 'models';
import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginService } from 'services';

export const Login : FunctionComponent = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const currentService = LoginService;

  const handleLogin = () => {
    form.validateFields().then((format: any) => {
      currentService.loginWithPhoneNumber(format.id).then(result => {
        if(result.code > 0) {
          result.timestamp = new Date().getTime()
          sessionStorage.setItem(USER_PROFILE, JSON.stringify(result));
          navigate('/'); // should home
        }
        else {
          message.warning(result.message)
        }
      })
    });
  }

  return (
    <div className='preview-result' style={{textAlign: 'left'}}>
      <Form
        form={form}
        name='login'
        labelCol={{span: 9}}
        wrapperCol={{span: 7}}
        layout={'horizontal'}
        onFinish={handleLogin}
      >
        <Form.Item label='账号' name='id' rules={[{ required: !scanCodeLogin, message: '请输入用户名' }]}>
          <Input placeholder='请输入用户名'/>
        </Form.Item>
        <Form.Item label='密码' name='password' rules={[{ required: !scanCodeLogin, message: '请输入密码' }]}>
          <Input type='password' placeholder='请输入密码'/>
        </Form.Item>
        <Form.Item wrapperCol={{span: 24}} style={{textAlign:'center'}}>
          <Space>
            <Button type='primary' htmlType='submit'>登陆</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
