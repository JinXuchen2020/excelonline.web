import React, { useState } from 'react';
import { Avatar, Button, Descriptions, Drawer, Space, Image, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from "@ant-design/icons";
import { IUserRspModel } from 'models';

export const HeaderCtl: React.FunctionComponent<{dataSource: IUserRspModel | undefined}> = ({dataSource}) => {
  let navigate = useNavigate()

  const [showProfile, setShowProfile] = useState(false);

  const handleLoginOut = () => {
    sessionStorage.clear()
    setShowProfile(false)
    navigate("/Login")
  }

  const handleProfileClose = () => {
    setShowProfile(false)
  }

  return (
    <>
      <Row>
        <Col xs={0} sm={24}>
          <Space style={{float: 'right', cursor:'pointer'}} onClick={() => setShowProfile(true)}>
            {
              dataSource === undefined ? undefined
                : (
                <>
                  <Avatar onClick={handleLoginOut} size="large" icon={<UserOutlined />} />
                  <label>{dataSource && dataSource.name}</label>
                </>)
            }
          </Space>
        </Col>
        <Col xs={24} sm={0}>
          <Space style={{float: 'right', cursor:'pointer'}} onClick={() => setShowProfile(true)}>
            {
              dataSource === undefined ? undefined
                : (
                <>
                  <Avatar onClick={handleLoginOut} size="large" icon={<UserOutlined />} />
                </>)
            }
          </Space>
        </Col>
      </Row>
    </>
  )
}
