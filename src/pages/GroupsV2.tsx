import { Button, Col, Row, Space, Tabs } from "antd";
import {
  SaleStatusTable,
  Loading
} from "components";
import {
  ISaleStatusListRspModel,
  ISaleStatusRspModel,
  IUserQueryOption,
} from "models";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GroupService } from "services";
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
    GroupService.downloadGroupManagers().then((rsp) => {
      if (rsp) {
        fileDownload(rsp, "组长使用情况.xlsx");
      }
    });
  };

  const handleRefresh = (query: Partial<IUserQueryOption>) => {
    setIsLoading(true);
    setLoadingTip("加载信息...");
    GroupService.getGroupManagers(query).then((rsp) => {
      if (rsp && rsp instanceof Array) {
        setSaleInfos(rsp);
      }

      setIsLoading(false);
    });
  };

  useEffect(() => {
    const query: Partial<IUserQueryOption> = queryString.parse(
      searchParams.toString()
    );
    query.pageNo = currentPage
    query.pageSize= 10
    handleRefresh(query);
  }, [searchParams, currentPage]);

  return (
    <>
      <Loading loading={isLoading} spinTip={loadingTip} />
      <Row style={{ marginTop: 10 }}>
        <Col offset={1} span={22}>
          <SaleStatusTable currentGroups={saleInfos} loading={false} handleSelect={handleSelect} handlePageChange={handlePageChange} currentPage={currentPage} />
        </Col>
      </Row>
    </>
  );
};
