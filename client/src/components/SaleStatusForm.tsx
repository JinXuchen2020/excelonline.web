import { Button, Col, Descriptions, Form, FormInstance, Input, Row, Space, DatePicker } from 'antd';
import { ISaleStatusRspModel } from 'models';
import moment from 'moment';
import React, { FunctionComponent, useEffect, useState } from 'react';

export const SaleStatusForm : FunctionComponent<{
  form: FormInstance,
  isDisabled: boolean,
  dataSource: ISaleStatusRspModel | undefined, 
  handleUpdate: any, 
  handleSave: any,
  handleValidate: any
}> 
= ({form, dataSource, handleUpdate, handleSave, handleValidate, isDisabled}) => {

  const shopNameValidator = async (rule: any, value: any, callback: any) => {
    if (value) {
      if (await handleValidate(value,'shopName')) {
        return Promise.reject('该店铺名或公司名已存在，请更换！');
      }
      else {
        return Promise.resolve();
      }
    } else {
      return Promise.resolve();
    }
  }

  const companyNameValidator = async (rule: any, value: any, callback: any) => {
    if (value) {
      if (await handleValidate(value, 'companyName')) {
        return Promise.reject('该店铺名或公司名已存在，请更换！');
      }
      else {
        return Promise.resolve();
      }
    } else {
      return Promise.resolve();
    }
  }

  useEffect(()=>{
    if(dataSource){
      form.setFieldsValue(dataSource);
    }

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
          validateTrigger={["onBlur"]}
          rules={[{required: true, whitespace: true, message: '请输入公司名称'}, {validator: companyNameValidator}]}
        >
          <Input style={{width: '99.5%'}} disabled={isDisabled} autoFocus={true} autoComplete="off" onChange ={(val: any) => handleUpdate({ companyName: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="品牌名称" 
          name="brandName"
          wrapperCol={{ span: 10 }}
        >
          <Input style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ brandName: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="店铺名称" 
          name="shopName"
          wrapperCol={{ span: 10 }}
          validateTrigger={["onBlur"]}
          rules={[{required: true, whitespace: true, message: '请输入店铺名称'},{validator: shopNameValidator}]}
        >
          <Input style={{width: '99.5%'}} autoComplete="off" disabled={isDisabled}  onChange ={(val: any) => handleUpdate({ shopName: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="业务落地仓" 
          name="storeName"
          wrapperCol={{ span: 10 }}
        >
          <Input style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ storeName: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="联系人" 
          name="contactName"
          wrapperCol={{ span: 10 }}
        >
          <Input style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ contactName: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="联系人岗位" 
          name="contactJob"
          wrapperCol={{ span: 10 }}
        >
          <Input style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ contactJob: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="联系方式" 
          name="contactPhone"
          wrapperCol={{ span: 10 }}
        >
          <Input style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ contactPhone: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="客户成交可能性" 
          name="successfulRate"
          wrapperCol={{ span: 10 }}
        >
          <Input style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: any) => handleUpdate({ successfulRate: val.target.value})}/>
        </Form.Item>
        <Form.Item 
          label="洽谈沟通" 
          name="linkUpDate"
          wrapperCol={{ span: 10 }}
        >
          <Row>
            <Col span={24}>
              <DatePicker 
                format={"YYYY-MM-DD"} 
                value={dataSource?.linkUpDate ? moment(dataSource?.linkUpDate) : null}
                style={{width: '99.5%'}} autoComplete="off"  onChange ={(val: moment.Moment | null) => handleUpdate({ linkUpDate: val?.format('YYYY-MM-DD')})}/>

            </Col>
          </Row>
        </Form.Item>
        <Form.Item 
          label="初步报价" 
          name="bidDate"
          wrapperCol={{ span: 10 }}
        >
          <Row>
            <Col span={24}>
              <DatePicker 
                format={"YYYY-MM-DD"} 
                style={{width: '99.5%'}} 
                value={dataSource?.bidDate ? moment(dataSource?.bidDate) : null}
                onChange ={(val: moment.Moment | null) => handleUpdate({ bidDate: val?.format('YYYY-MM-DD')})}/>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item 
          label="参观现场" 
          name="visitDate"
          wrapperCol={{ span: 10 }}
        >
          <Row>
            <Col span={24}>              
              <DatePicker 
                format={"YYYY-MM-DD"} 
                style={{width: '99.5%'}} 
                value={dataSource?.visitDate ? moment(dataSource?.visitDate) : null}
                onChange ={(val: any) => handleUpdate({ visitDate: val?.format('YYYY-MM-DD')})}/>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item 
          label="确定报价" 
          name="bidConfirmDate"
          wrapperCol={{ span: 10 }}
        >
          <Row>
            <Col span={24}>
              <DatePicker 
                format={"YYYY-MM-DD"} 
                style={{width: '99.5%'}} 
                value={dataSource?.bidConfirmDate ? moment(dataSource?.bidConfirmDate) : null}
                onChange ={(val: any) => handleUpdate({ bidConfirmDate: val?.format('YYYY-MM-DD')})}/>

            </Col>
          </Row>
        </Form.Item>
        <Form.Item 
          label="签订合同" 
          name="contractDate"
          wrapperCol={{ span: 10 }}
        >
          <Row>
            <Col span={24}>
              <DatePicker 
                format={"YYYY-MM-DD"} 
                style={{width: '99.5%'}} 
                value={dataSource?.contractDate ? moment(dataSource?.contractDate) : null}
                onChange ={(val: any) => handleUpdate({ contractDate: val?.format('YYYY-MM-DD')})}/>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item 
          label="入仓发货" 
          name="sendDate"
          wrapperCol={{ span: 10 }}
        >
          <Row>
            <Col span={24}>              
              <DatePicker 
                format={"YYYY-MM-DD"} 
                style={{width: '99.5%'}} 
                value={dataSource?.sendDate ? moment(dataSource?.sendDate) : null}
                onChange ={(val: any) => handleUpdate({ sendDate: val?.format('YYYY-MM-DD')})}/>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item 
          label="备注说明" 
          name="remarkDate"
          wrapperCol={{ span: 10 }}
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
