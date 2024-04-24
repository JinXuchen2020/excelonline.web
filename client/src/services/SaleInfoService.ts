import { $fetch, IFetchProps } from "./BaseService"
import queryString from 'query-string';
import { ISaleStatusReqModel,  IGroupQueryOption, ISaleStatusRspModel, ISaleStatusListRspModel } from "models";

const Api = { 
  getSaleInfos: (query: Partial<IGroupQueryOption>) => ({ method: "GET", url: queryString.stringifyUrl({url: 'saleInfos', query: {...query}})} as IFetchProps),
  getSaleStatus: (id: string) => ({ method: "GET", url:  `saleInfos/${id}`} as IFetchProps),
  addSaleStatus: (input: ISaleStatusReqModel) => ({ method: "POST", url: `saleInfos`, body: input} as IFetchProps),
  updateSaleStatus: (id: string, input: ISaleStatusReqModel) => ({ method: "PUT", url: `saleInfos/${id}`, body: input} as IFetchProps),
  deleteSaleStatus: (id: string) => ({ method: "DELETE", url:  `saleInfos/${id}`} as IFetchProps), 

  downloadSaleInfos: () => ({ method: "DOWNLOAD", url: 'saleInfos/download'} as IFetchProps),
}

export const SaleInfoService = {
  getSaleInfos: async (query: Partial<IGroupQueryOption>) => $fetch<ISaleStatusListRspModel>(Api.getSaleInfos(query)),
  getSaleStatus: async (id: string) => $fetch<ISaleStatusRspModel>(Api.getSaleStatus(id)),
  addSaleStatus: async (input: ISaleStatusReqModel) => $fetch(Api.addSaleStatus(input)),
  updateSaleStatus: async (id: string, input: ISaleStatusReqModel) => $fetch(Api.updateSaleStatus(id, input)),
  deleteSaleStatus: async (id: string) => $fetch(Api.deleteSaleStatus(id)),

  downloadSaleInfos: async () => $fetch<Blob>(Api.downloadSaleInfos()),
}
