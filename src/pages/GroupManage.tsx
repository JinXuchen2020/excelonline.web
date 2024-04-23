import { Button, Col, Form, Row } from 'antd';
import { ConfirmModal, CourseSelectTable, SaleStatusForm, SaleStatusTable, Loading } from 'components';
import { ICourseRspModel, IGroupManagerCourseReqModel, ISaleStatusReqModel, IGroupManagerStatusRspModel, ISaleStatusRspModel, isOfType, IUserRspModel } from 'models';
import { GroupSelectCourse, Users } from 'pages';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { GroupService, UserService } from 'services';
import { LeftOutlined} from '@ant-design/icons';

export type Flag = "Base" | "SelectUser" | "SelectCourse" | "GroupStatus" | "SwitchManager" | "CourseStatus";
export const GroupManage : FunctionComponent = () => {
  let { managerId } = useParams();
  const [, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const [form] = Form.useForm()

  const [dataModel, setDataModel] = useState<ISaleStatusRspModel>();

  const [deleteCourses, setDeleteCourses] = useState<ICourseRspModel[]>([]);

  const [pageFlag, setPageFlag] = useState<Flag>("Base");  

  const [isLoading, setIsLoading] = useState(false);
  const [loadingTip, setLoadingTip] = useState<string>()

  const [isEditing, setIsEditing] = useState(false)

  let groupManager = dataModel!

  const setGroupManager = (groupManagerProps: Partial<IGroupManagerStatusRspModel>) => {
    setDataModel({ ...groupManager, ...groupManagerProps });
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
          GroupService.updateGroupManager(dataModel.manager.id, input).then(()=> {
            setIsLoading(false)
            navigate("/groups")
          })
        }
        else {
          GroupService.addGroupManager(input).then(()=> {
            setIsLoading(false)
            navigate("/groups")
          })
        }
      }
    })
    .catch(() => {
    })    
  }

  useEffect(()=>{
    if(managerId) {
      UserService.setErrorHandler()
      setIsLoading(true)
      setLoadingTip("加载详情...")
      GroupService.getGroupManager(managerId).then(rsp=> {
        if(rsp && rsp.manager) {
          setDataModel(rsp)
        }

        setIsLoading(false)
      })
    }
  }, [managerId])

  return (
    <>
      <Loading loading={isLoading} spinTip={loadingTip} />
      <SaleStatusForm 
          form={form}
          dataSource ={dataModel} 
          handleUpdate={setGroupManager}
          handleSave={handleSave} />      
    </>
  );
}
