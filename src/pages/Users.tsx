import React, { useState, useEffect } from "react";
import { Button, Col, Row, Space, Modal } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";
import { UserService } from "services";
import queryString from "query-string";
import { IUserListRspModel, IUserQueryOption, IUserReqModel, IUserRspModel } from "models";
import { Loading, TableSearch, UserForm, UserTable } from "components";
import fileDownload from "js-file-download";

export const Users: React.FunctionComponent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [userModels, setUserModels] = useState<IUserListRspModel>();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTip, setLoadingTip] = useState<string>();
  const [showUserModal, setShowUserModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = async (page: number, pageSize: number) => {
    setCurrentPage(page);
  };

  const handleCreate = () => {
    setShowUserModal(true);
  }
  
  const handleSave = (dataModel: IUserRspModel) => {
    if(dataModel) {
      const input : IUserReqModel= {
        ...dataModel
      }

      if(dataModel.id) {
        UserService.putUser(dataModel.id, input).then(()=> {
          refresh({})
          setShowUserModal(false);
        })
      }
      else {
        UserService.addUser(input).then(()=> {
          refresh({})
          setShowUserModal(false);
        })
      }
    }   
  }

  const handleValidate = async (data: string) => {
    if(data) {
      const input : Partial<IUserQueryOption> = {
        phoneNumber: data,
      }

      var result = await UserService.validateUser(input);
      return result;
    }   
  }

  const refresh = (query: Partial<IUserQueryOption>) => {
    setIsLoading(true);
    setLoadingTip("加载用户...");
    UserService.getUsers(query).then((rsp) => {
      if (rsp && rsp.data instanceof Array) {
        setUserModels(rsp);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const query: Partial<IUserQueryOption> = queryString.parse(
      searchParams.toString()
    );
    if (query.phoneNumber) {
      query.name = query.phoneNumber;
    }
    query.pageNo = currentPage;
    query.pageSize = 10;
    refresh(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, currentPage]);

  return (
    <>
      <Loading loading={isLoading} spinTip={loadingTip} />
      <Row>
        <Col>
          <Row>
            <Col span={18}>
              <TableSearch
                optionKey={"phoneNumber"}
                placeholder={"请输入手机号码"}
                buttonText={"查找"}
                handleRefresh={() => setCurrentPage(1)}
              />
            </Col>
            <Col span={6}>
              <Space style={{ float: "right" }}>
                <Button type="primary" onClick={handleCreate}>
                  新建用户
                </Button>
              </Space>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col>
              <UserTable
                handleSelect={null}
                dataSource={userModels}
                loading={false}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal 
        title="创建用户" 
        open={showUserModal}
        centered={true}
        destroyOnClose={true} 
        footer={(null)} 
        onCancel={()=> setShowUserModal(false)}
      >
        <UserForm handleSave={handleSave} handleValidate={handleValidate} />
      </Modal>
    </>
  );
};
