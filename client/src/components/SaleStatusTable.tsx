import { Button, Table } from "antd"
import React, { FunctionComponent } from "react";
import { ISaleStatusListRspModel, ISaleStatusRspModel, IUserRspModel } from "models";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";

export const SaleStatusTable : FunctionComponent<{
  dataSource: ISaleStatusListRspModel | undefined;
  loading: boolean;
  handleSelect: any;
  handlePageChange: any;
  currentPage: number;
}> 
= ({dataSource, currentPage, loading, handleSelect, handlePageChange}) => {  
  const columns : ColumnsType<ISaleStatusRspModel> = [
    {
      title: '对接销售',
      dataIndex: 'salerName',
      key: 'salerName',
      width: 100,
      ellipsis: true,
      fixed: 'left',
    },
    {
      title: '公司名称',
      dataIndex: 'companyName',
      key: 'companyName',
      ellipsis: true,
      width: 100,
      fixed: 'left',
    },
    {
      title: '品牌名称',
      dataIndex: 'brandName',
      key: 'brandName',
      ellipsis: true,
      width: 100,
      fixed: 'left',
    },
    {
      title: '店铺名称',
      dataIndex: 'shopName',
      key: 'shopName',
      ellipsis: true,
      width: 100,
      fixed: 'left',
    },
    {
      title: '业务落地仓',
      dataIndex: 'storeName',
      key: 'storeName',
      ellipsis: true,
      width: 100,
      fixed: 'left',
    },
    {
      title: '客户成交可能性',
      dataIndex: 'successfulRate',
      key: 'successfulRate',
      ellipsis: true,
      width: 100,
      fixed: 'left',
    },
    {
      title: '联系人',
      children:[
        {
          title: '姓名',
          dataIndex: 'contactName',
          key: 'contactName',
          ellipsis: true,
          width: 100,
        },
        {
          title: '岗位',
          dataIndex: 'contactJob',
          key: 'contactJob',
          ellipsis: true,
          width: 100,
        },
        {
          title: '联系方式',
          dataIndex: 'contactPhone',
          key: 'contactPhone',
          ellipsis: true,
          width: 100,
        }
      ]
    },
    {
      title: '甘特图进展说明（填写日期）',
      children:[
        {
          title: '洽谈沟通',
          dataIndex: 'linkUpDate',
          key: 'linkUpDate',
          ellipsis: true,
          width: 100,
        },
        {
          title: '初步报价',
          dataIndex: 'bidDate',
          key: 'bidDate',
          ellipsis: true,
          width: 100,
        },
        {
          title: '参观现场',
          dataIndex: 'visitDate',
          key: 'visitDate',
          ellipsis: true,
          width: 100,
        },
        {
          title: '确定报价',
          dataIndex: 'bidConfirmDate',
          key: 'bidConfirmDate',
          ellipsis: true,
          width: 100,
        },
        {
          title: '签订合同',
          dataIndex: 'contractDate',
          key: 'contractDate',
          ellipsis: true,
          width: 100,
        },
        {
          title: '入仓发货',
          dataIndex: 'sendDate',
          key: 'sendDate',
          ellipsis: true,
          width: 100,
        },
        {
          title: '备注说明',
          dataIndex: 'remarkDate',
          key: 'remarkDate',
          ellipsis: true,
          width: 100,
        }
      ]
    },
    {
      title: "",
      width: 60,
      key: "action",
      fixed: "right",
      render: (text, record) => (
        <Button
          size="small"
          type="primary"
          onClick={() => handleSelect(record)}
        >
          查看
        </Button>
      ),
    }
  ]

  return (
    <>
      <Table
        size={"small"}
        loading={loading}
        dataSource={dataSource?.data}
        pagination={{
          pageSize: 10,
          current: currentPage,
          onChange: (page, pageSize) => handlePageChange(page, pageSize),
          showSizeChanger: false,
          total: dataSource?.total,
        }}
        rowKey={(c) => c.id!}
        scroll={{ x: 1200 }}
        columns={columns}
      />
    </>
  )
}