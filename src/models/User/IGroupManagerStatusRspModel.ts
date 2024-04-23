import { IGroupManagerRspModel, ISaleStatusRspModel } from ".";

export interface IGroupManagerStatusRspModel {
  manager: IGroupManagerRspModel,
  groups: ISaleStatusRspModel[],
}