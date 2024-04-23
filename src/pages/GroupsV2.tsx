import { Button, Col, Row, Space, Tabs } from "antd";
import {
  SaleStatusTable,
  Loading,
  TableSearch
} from "components";
import {
  ISaleStatusListRspModel,
  ISaleStatusRspModel,
  IGroupQueryOption,
} from "models";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SaleInfoService } from "services";
import fileDownload from "js-file-download";
import queryString from "query-string";

export const GroupsV2: FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [saleInfos, setSaleInfos] =
    useState<ISaleStatusListRspModel>();

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = async (page: number, pageSize: number) => {
    setCurrentPage(page);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [loadingTip, setLoadingTip] = useState<string>();

  const handleSelect = (selected: ISaleStatusRspModel) => {
    navigate(`/saleInfos/${selected.id}`);
  };

  const handleCreate = () => {
    navigate(`/saleInfos/create`);
  };

  const handleDownload = () => {
    SaleInfoService.downloadSaleInfos().then((rsp) => {
      if (rsp) {
        fileDownload(rsp, "销售报备信息.xlsx");
      }
    });
  };

  const handleRefresh = (query: Partial<IGroupQueryOption>) => {
    setIsLoading(true);
    setLoadingTip("加载信息...");
    SaleInfoService.getSaleInfos(query).then((rsp) => {
      if (rsp && rsp instanceof Array) {
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
    query.pageSize= 10
    handleRefresh(query);
  }, [searchParams, currentPage]);

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
                <Button type="primary" onClick={handleDownload}>
                  下载数据
                </Button>
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
    </>
  );
};
