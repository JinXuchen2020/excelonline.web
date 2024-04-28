import { Button, Col, Form, Row } from 'antd';
import { SaleStatusForm, SaleStatusTable, Loading } from 'components';
import { IGroupQueryOption, ISaleStatusReqModel,  ISaleStatusRspModel, isOfType, ITokenRspModel, IUserRspModel, USER_PROFILE } from 'models';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SaleInfoService, UserService } from 'services';
import { LeftOutlined} from '@ant-design/icons';

export type Flag = "Base" | "SelectUser" | "SelectCourse" | "GroupStatus" | "SwitchManager" | "CourseStatus";
export const GroupManage : FunctionComponent = () => {
  let { id } = useParams();
  const [, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const [form] = Form.useForm()

  const [dataModel, setDataModel] = useState<ISaleStatusRspModel>();
  const [userModel, setUserModel] = useState<IUserRspModel>();

  const [pageFlag, setPageFlag] = useState<Flag>("Base");  

  const [isLoading, setIsLoading] = useState(false);
  const [loadingTip, setLoadingTip] = useState<string>()

  const [isEditing, setIsEditing] = useState(false)

  let modelInstance = dataModel!

  const handleUpdate = (props: Partial<ISaleStatusRspModel>) => {
    setDataModel({ ...modelInstance, ...props });
    setIsEditing(true)
  }

  const handleSave = () => {
    form.validateFields().then(() =>{
      if(dataModel) {
        const input : ISaleStatusReqModel= {
          ...dataModel
        }

        setIsLoading(true)
        setLoadingTip("保存...")  
        if(dataModel.id) {
          SaleInfoService.updateSaleStatus(dataModel.id, input).then(()=> {
            setIsLoading(false)
            navigate("/saleInfos")
          })
        }
        else {
          const tokenString = sessionStorage.getItem(USER_PROFILE)!
          const userToken = JSON.parse(tokenString) as ITokenRspModel
          if (userToken.user.role !== 'admin') {
            input.salerName = userToken.user.name
          }
          SaleInfoService.addSaleStatus(input).then(()=> {
            setIsLoading(false)
            navigate("/saleInfos")
          })
        }
      }
    })
    .catch(() => {
    })    
  }

  const handleValidate = async(data: string, propName: string) => {
    var result = false;
    if(userModel) 
    {
      if (!id && userModel.role !== 'admin') {
        if (data) {
          let input : Partial<IGroupQueryOption> = {};
          if(propName === 'companyName') 
          {
            input.companyName = data;
            if(dataModel?.shopName) 
            {
              input.shopName = dataModel.shopName;
            }
          }
          else if(propName === 'shopName') 
          {
            input.shopName = data;
            if(dataModel?.companyName) 
            {
              input.companyName = dataModel.companyName;
            }
          }

          result =await SaleInfoService.validateSaleStatus(input)
        }
      }
    }   
  
    return result;       
  }

  const handleBack = () => {
    if(dataModel) {
      const input : ISaleStatusReqModel= {
        ...dataModel
      }

      if (dataModel.id) {
        SaleInfoService.updateSaleStatus(dataModel.id, input).then(()=> {
          navigate("/saleInfos")
        })
      }
      else {
        navigate("/saleInfos")
      }
    }
    else { 
      navigate("/saleInfos")
    }
  }

  const backBtnLabel = () => {
    return id ? "编辑销售信息" : "新建销售信息";
  }

  useEffect(()=>{
    if(id) {
      UserService.setErrorHandler()
      setIsLoading(true)
      setLoadingTip("加载详情...")
      SaleInfoService.getSaleStatus(id).then(rsp=> {
        if(rsp) {
          setDataModel(rsp)
        }

        setIsLoading(false)
      })
    }
  }, [id])

  useEffect(() => {
    const tokenString = sessionStorage.getItem(USER_PROFILE)!
    const userToken = JSON.parse(tokenString) as ITokenRspModel
    setUserModel(userToken.user)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <Loading loading={isLoading} spinTip={loadingTip} />
      <Button type="text" icon ={<LeftOutlined />} onClick={handleBack}>{backBtnLabel()}</Button>
      <SaleStatusForm 
        form={form} 
        isDisabled = { id && userModel?.role !== 'admin' ? true : false }
        dataSource ={dataModel} 
        handleUpdate={handleUpdate}
        handleSave={handleSave}
        handleValidate={handleValidate}
      />
    </>
  );
}
