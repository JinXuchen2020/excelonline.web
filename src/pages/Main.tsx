import React, { FunctionComponent, useEffect, useState } from 'react';
import '../styles/Main.css';
import { Layout, Menu, Tooltip } from 'antd';
import { useNavigate, Outlet, useSearchParams } from 'react-router-dom'
import { MenuInfo, MenuClickEventHandler }  from 'rc-menu/lib/interface'
import { ConfirmModal, HeaderCtl } from 'components';
import { useLocation } from 'react-router';
import { IEnterpriseUserRspModel, ITokenRspModel, USER_PROFILE } from 'models';
import moment from 'moment';

const { Header, Content, Sider } = Layout;

export const Main : FunctionComponent = () => {
  let navigate = useNavigate();    
  const [searchParams, ] = useSearchParams();
  const location = useLocation();

  const [activeKey, setActiveKey] = useState<string>();

  const [userModel, setUserModel] = useState<IEnterpriseUserRspModel>();

  const [userTokenString, setUserTokenString] = useState<string>();

  const selectMenu : MenuClickEventHandler = (info: MenuInfo) =>{
    navigate(info.key);
  }

  useEffect(() => {
    const key = location.pathname.substring(1).split("/")[0];
    setActiveKey(key)
  }, [location.pathname])

  useEffect(() => {
    const tokenString = sessionStorage.getItem(USER_PROFILE)
    if(tokenString) {
      setUserTokenString(tokenString)
    }
    else {
      navigate('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchParams])

  useEffect(() => {    
    if(userTokenString) {
      const userToken = JSON.parse(userTokenString) as ITokenRspModel
      const timeout = moment.unix(5 * 60 * 60 * 1000).unix();
      const isTimeOut = new Date().getTime() - userToken.timestamp > timeout
      if(isTimeOut) {
        const index = window.location.pathname.indexOf('/', 1)
        if(index >= 0) {
          const originPath = window.location.pathname.substring(index)
          sessionStorage.setItem("OriginPath", originPath)
        }
        sessionStorage.removeItem(USER_PROFILE)
        navigate('/login')
      }
      else {
        if(userModel === undefined) {
          setUserModel(userToken.user)
          const originPath = sessionStorage.getItem("OriginPath")
          if(originPath) {
            navigate(originPath)
            sessionStorage.removeItem("OriginPath")
          }
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTokenString]);
  
  return (
    <Layout>
      <Header className="site-layout-background">
        <HeaderCtl currentUser={userModel} />
      </Header>
      <Layout>
        <Sider 
          breakpoint="lg"
          collapsedWidth="0" 
          width={120} 
          className="site-layout-background"
        >
          <Menu
            mode="inline"
            onClick ={selectMenu}
            activeKey={activeKey}
            selectedKeys={[activeKey!]}
            style={{ height: '100%', borderRight: 0, textAlign: 'center' }}
          > 
            {
              userModel && userModel.managementModules.length > 0 ? userModel.managementModules.sort((a, b) => a.sequence - b.sequence).map(c=> (
                <Menu.Item key={c.key}>
                  {c.name}
                </Menu.Item>
              )) : undefined
            }
          </Menu>
        </Sider>
        <Layout style={{ padding: '14px' }}>
          <Content
            className="site-layout-background"
            onScroll={(e) => {              
              sessionStorage.setItem("scrollTop", e.currentTarget.scrollTop.toString());
            }}
            style={{
              padding: 14,
              margin: 0,
              overflow: 'auto',
              height: 'calc(100vh - 130px)',
            }}
          > 
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
