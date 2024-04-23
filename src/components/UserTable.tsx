import { Button } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { IUserListRspModel, IUserRspModel } from "models";
import moment from "moment";
import React, { FunctionComponent } from "react";

export const UserTable: FunctionComponent<{
  dataSource: IUserListRspModel | undefined;
  handlePageChange: any;
  currentPage: number;
  loading: boolean;
  handleSelect?: any;
}> = ({ dataSource, currentPage, loading, handleSelect, handlePageChange }) => {
  const columns: ColumnsType<IUserRspModel> = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      width: 100,
    },
    {
      title: "手机",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ellipsis: true,
      width: 100,
    },
    {
      title: "权限",
      dataIndex: "role",
      key: "role",
      ellipsis: true,
      width: 100,
    },
    // {
    //   title: "",
    //   key: "action",
    //   width: handleSelect === undefined ? 0 : 100,
    //   fixed: "right",
    //   render: (text, record) =>
    //     handleSelect && (
    //       <Button
    //         size="small"
    //         disabled={record.isMemberGroupLeader}
    //         type="primary"
    //         onClick={() => handleSelect(record)}
    //       >
    //         设为组长
    //       </Button>
    //     ),
    // },
  ];

  return (
    <Table
      loading={loading}
      dataSource={dataSource?.data}
      size={"small"}
      rowKey={(record: any) => record.id}
      pagination={{
        pageSize: 10,
        current: currentPage,
        onChange: (page : any, pageSize: any) => handlePageChange(page, pageSize),
        showSizeChanger: false,
        total: dataSource?.total,
      }}
      columns={columns}
    />
  );
};
