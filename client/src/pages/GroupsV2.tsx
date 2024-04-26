import { Button, Col, Form, Modal, Row, Select, Space, Tabs } from "antd";
import {
  SaleStatusTable,
  Loading,
  TableSearch
} from "components";
import {
  ISaleStatusListRspModel,
  ISaleStatusRspModel,
  IGroupQueryOption,
  ITokenRspModel,
  USER_PROFILE,
  ISaleStatusReqModel,
  IUserRspModel,
} from "models";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SaleInfoService, UserService } from "services";
import fileDownload from "js-file-download";
import queryString from "query-string";

export const GroupsV2: FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showUserModal, setShowUserModal] = useState(false);
  const [userModel, setUserModel] = useState<IUserRspModel>();

  const [saleInfos, setSaleInfos] = useState<ISaleStatusListRspModel>();

  const [salerList, setSalerList] = useState<IUserRspModel[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentDataModel, setCurrentDataModel] = useState<ISaleStatusRspModel>()

  const handlePageChange = async (page: number, pageSize: number) => {
    setCurrentPage(page);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [loadingTip, setLoadingTip] = useState<string>();

  const handleSelect = (selected: ISaleStatusRspModel, actionType: string) => {
    if (actionType === "view") {  
      navigate(`/saleInfos/${selected.id}`);
    }
    else {
      setShowUserModal(true)
      setCurrentDataModel(selected)
    }
  };

  const handleAssign = (salerName: string) => {
    if (currentDataModel) {
      const input : ISaleStatusReqModel= {
        ...currentDataModel,
        salerName: salerName,
      }
  
      setIsLoading(true)
      setLoadingTip("保存...")  
      SaleInfoService.updateSaleStatus(currentDataModel.id, input).then(()=> {
        setIsLoading(false)
        setShowUserModal(false)
        handleRefresh({})
      })
    }    
  };

  const handleCreate = () => {
    navigate(`/saleInfos/create`);
  };

  const handleDownload = () => {
    setIsLoading(true);
    setLoadingTip("下载中...");
    SaleInfoService.downloadSaleInfos().then((rsp) => {
      if (rsp) {
        fileDownload(rsp, "销售报备信息.xlsx");
      }
      setIsLoading(false);
    });
  };

  const handleRefresh = (query: Partial<IGroupQueryOption>) => {
    setIsLoading(true);
    setLoadingTip("加载信息...");
    SaleInfoService.getSaleInfos(query).then((rsp) => {
      if (rsp && rsp.data instanceof Array) {
        setSaleInfos(rsp);
      }

      setIsLoading(false);
    });
  };

  useEffect(() => {
    const query: Partial<IGroupQueryOption> = queryString.parse(
      searchParams.toString()
    );
    query.pageNo = currentPage
    query.pageSize = 10
    if (userModel && userModel.role !== 'admin') {
      query.salerName = userModel.name
    }
    handleRefresh(query);
  }, [searchParams, currentPage]);

  useEffect(() => {
    UserService.getSalerList().then((rsp) => {
      if (rsp && rsp instanceof Array) {
        setSalerList(rsp);
      }
    });
  }, []);  

  useEffect(() => {
    const tokenString = sessionStorage.getItem(USER_PROFILE)!
    const userToken = JSON.parse(tokenString) as ITokenRspModel
    setUserModel(userToken.user)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <Loading loading={isLoading} spinTip={loadingTip} />
      <Row>
        <Col>
          <Row gutter={24}>
            <Col span={18}>
              <TableSearch
                optionKey={"companyName"}
                placeholder={"请输入公司名称"}
                buttonText={"查找"}
              />
            </Col>
            <Col span={6}>
              <Space style={{ float: "right" }}>
                <Button type="primary" onClick={handleCreate}>
                  新建销售
                </Button>
                {
                  userModel && userModel.role === 'admin' && (                    
                    <Button type="primary" onClick={handleDownload}>
                      下载数据
                    </Button>
                  )
                }
              </Space>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col>
              <SaleStatusTable 
                dataSource={saleInfos} 
                loading={false} 
                handleSelect={handleSelect} 
                handlePageChange={handlePageChange} 
                currentPage={currentPage} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal 
        title="分配销售员" 
        open={showUserModal}
        centered={true}
        destroyOnClose={true} 
        footer={(null)} 
        onCancel={()=> setShowUserModal(false)}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item label="销售员" name="salerName" wrapperCol={{ span: 10 }}>            
            <Select onChange={(val: any) => handleAssign(val)}>
              {
                salerList && salerList.map((item) => {
                  return <Select.Option key={item.id} value={item.name}>{item.name}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
