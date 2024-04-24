import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { useSearchParams } from 'react-router-dom';
import queryString from 'query-string';

interface ISearchProps {
  optionKey: string,
  placeholder: string,
  buttonText: string,
  handleRefresh?: any
}

export const TableSearch: React.FunctionComponent<ISearchProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams(); 

  const {optionKey, placeholder, buttonText, handleRefresh} = props

  const [form] = Form.useForm()

  const handleSearch = async () => {
    const query = await form.validateFields()
    if (query[optionKey]) {
      setSearchParams({...query})
      if(handleRefresh) {
        handleRefresh()
      }
    }
  }

  const handleChange = (value: string) =>{
    if(value.length === 0) {
      setSearchParams(value)
      if(handleRefresh) {
        handleRefresh()
      }
    }
  }

  useEffect(() => {
    const query = queryString.parse(searchParams.toString())
    if (query[optionKey]) {
      form.setFieldsValue(query)
    }
    else {
      form.resetFields()
    }
  }, [searchParams]);

  return (
    <Row gutter={24}>
      <Col span={24}>
        <Form layout={'inline'} form={form} onFinish={() => handleSearch()}>
          <Form.Item
            name={optionKey}
          >
            <Input
              size="middle" 
              allowClear={true}
              autoComplete={"off"}
              onBlur={(e) => handleChange(e.target.value)}
              placeholder={placeholder}
              style={{width:180}} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' onClick={handleSearch}>{buttonText}</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
