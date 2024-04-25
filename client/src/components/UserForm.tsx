import {
  Button,
  Form,
  Input,
  Space,
  Select,
} from "antd";
import { IUserRspModel } from "models";
import React, { FunctionComponent, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const UserForm: FunctionComponent<{
  handleSave: any,
}>  = ({handleSave : save}) => {
  const [form] = Form.useForm()
  const navigate = useNavigate();

  const [dataModel, setDataModel] = useState<IUserRspModel>();

  let modelInstance = dataModel!

  const handleUpdate = (props: Partial<IUserRspModel>) => {
    setDataModel({ ...modelInstance, ...props });
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
            { required: true, whitespace: true, message: "请输入姓名" },
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
        <Form.Item label="手机号" name="phoneNumber" wrapperCol={{ span: 10 }}>
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
