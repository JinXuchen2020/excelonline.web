import { Button, Col, Descriptions, Form, FormInstance, Input, Row, Space, DatePicker } from 'antd';
import { ISaleStatusRspModel } from 'models';
import React, { FunctionComponent, useEffect, useState } from 'react';

export const SaleStatusForm : FunctionComponent<{
  form: FormInstance,
  dataSource: ISaleStatusRspModel | undefined, 
  handleUpdate: any, 
  handleSave: any,
}> 
= ({form, dataSource, handleUpdate, handleSave}) => {

  useEffect(()=>{
  }, [dataSource])
  
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
      >        
        <Form.Item 
          label="公司名称" 
          name="companyName"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur", "onChange"]}
          //rules={[{required: true, whitespace: true, message: '请输入课程名称'}, { validator: nameValidator}]}
        >
          <Input style={{width: '99.5%'}} autoFocus={true} autoComplete="off" onChange ={(val: any) => handleUpdate({ companyName: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="品牌名称" 
          name="brandName"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur", "onChange"]}
          //rules={[{required: true, whitespace: true, message: '请输入课程名称'}, { validator: nameValidator}]}
        >
          <Input style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ brandName: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="店铺名称" 
          name="shopName"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur", "onChange"]}
          //rules={[{required: true, whitespace: true, message: '请输入课程名称'}, { validator: nameValidator}]}
        >
          <Input style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ shopName: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="业务落地仓" 
          name="storeName"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur", "onChange"]}
          //rules={[{required: true, whitespace: true, message: '请输入课程名称'}, { validator: nameValidator}]}
        >
          <Input style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ storeName: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="联系人" 
          name="contactName"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur", "onChange"]}
          //rules={[{required: true, whitespace: true, message: '请输入课程名称'}, { validator: nameValidator}]}
        >
          <Input style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ contactName: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="联系人岗位" 
          name="contactJob"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur", "onChange"]}
          //rules={[{required: true, whitespace: true, message: '请输入课程名称'}, { validator: nameValidator}]}
        >
          <Input style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ contactJob: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="联系方式" 
          name="contactPhone"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur", "onChange"]}
          //rules={[{required: true, whitespace: true, message: '请输入课程名称'}, { validator: nameValidator}]}
        >
          <Input style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ contactPhone: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="客户成交可能性" 
          name="successfulRate"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur", "onChange"]}
          //rules={[{required: true, whitespace: true, message: '请输入课程名称'}, { validator: nameValidator}]}
        >
          <Input style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ successfulRate: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="洽谈沟通" 
          name="linkUpDate"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur", "onChange"]}
          //rules={[{required: true, whitespace: true, message: '请输入课程名称'}, { validator: nameValidator}]}
        >
          <DatePicker  style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ linkUpDate: val.target.value})}/>
          {/* <Input style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ linkUpDate: val.target.value})}/> */}
        </Form.Item>
        <Form.Item 
          label="初步报价" 
          name="bidDate"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur", "onChange"]}
          //rules={[{required: true, whitespace: true, message: '请输入课程名称'}, { validator: nameValidator}]}
        >
          <DatePicker style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ bidDate: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="参观现场" 
          name="visitDate"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur", "onChange"]}
          //rules={[{required: true, whitespace: true, message: '请输入课程名称'}, { validator: nameValidator}]}
        >
          <DatePicker style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ visitDate: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="确定报价" 
          name="bidConfirmDate"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur", "onChange"]}
          //rules={[{required: true, whitespace: true, message: '请输入课程名称'}, { validator: nameValidator}]}
        >
          <DatePicker style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ bidConfirmDate: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="签订合同" 
          name="contractDate"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur", "onChange"]}
          //rules={[{required: true, whitespace: true, message: '请输入课程名称'}, { validator: nameValidator}]}
        >
          <DatePicker style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ contractDate: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="入仓发货" 
          name="contractDate"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur", "onChange"]}
          //rules={[{required: true, whitespace: true, message: '请输入课程名称'}, { validator: nameValidator}]}
        >
          <DatePicker style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ contractDate: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="备注说明" 
          name="remarkDate"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur", "onChange"]}
          //rules={[{required: true, whitespace: true, message: '请输入课程名称'}, { validator: nameValidator}]}
        >
          <Input style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ remarkDate: val.target.value})}/>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 4}}>
          <Space>
            <Button type="primary" onClick={handleSave}>确认</Button>
          </Space>
        </Form.Item>
      </Form>
    </>  
  );
}
