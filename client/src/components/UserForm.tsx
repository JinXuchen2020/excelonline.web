import {
  Button,
  Form,
  Input,
  Space,
  Select,
} from "antd";
import { RuleObject } from "antd/lib/form";
import { StoreValue } from "antd/lib/form/interface";
import { IUserRspModel } from "models";
import React, { FunctionComponent, useState } from "react";

export const UserForm: FunctionComponent<{
  handleValidate: any,
  handleSave: any,
}>  = ({handleValidate, handleSave : save}) => {
  const [form] = Form.useForm()

  const [dataModel, setDataModel] = useState<IUserRspModel>();

  let modelInstance = dataModel!

  const handleUpdate = (props: Partial<IUserRspModel>) => {
    setDataModel({ ...modelInstance, ...props });
  }

  const validator = async (rule: RuleObject, value: StoreValue, callback: any) =>{
    if(value) {
      if(await handleValidate(value)) 
      {
        return Promise.reject('该用户手机号已存在!');
      }
      else 
      {
        return Promise.resolve();
      }
    }
    else{
      return Promise.resolve();
    }    
  }
  
  const handleSave = () => {
    form.validateFields().then(() =>{
      save(dataModel);
    })
    .catch(() => {
    })    
  }

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
      >
        <Form.Item
          label="姓名"
          name="name"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onChange"]}
          rules={[
            { required: true, whitespace: true, message: "请输入姓名" }
          ]}
        >
          <Input
            style={{ width: "99.5%" }}
            autoFocus={true}
            autoComplete="off"
            onChange={(val: any) =>
              handleUpdate({ name: val.target.value })
            }
          />
        </Form.Item>
        <Form.Item 
          label="手机号" 
          name="phoneNumber" 
          wrapperCol={{ span: 10 }}
          validateTrigger={["onblur"]}
          rules={[
            { required: true, whitespace: true, message: "请输入手机号" },
            { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" },
            { validator: validator }
          ]}
        >
          <Input
            style={{ width: "99.5%" }}
            autoComplete="off"
            onChange={(val: any) =>
              handleUpdate({ phoneNumber: val.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="权限" name="role" wrapperCol={{ span: 10 }}>
          <Select onChange={(val: any) =>
              handleUpdate({ role: val })}>
            <Select.Option value={'admin'}>管理员</Select.Option>
            <Select.Option value={'saler'}>销售员</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Space>
            <Button type="primary" onClick={handleSave}>
              确认
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
