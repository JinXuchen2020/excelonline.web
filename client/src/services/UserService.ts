import { $fetch, IFetchProps, setErrorHandler } from "./BaseService"
import queryString from 'query-string';
import { IUserRspModel, IUserListRspModel, IUserQueryOption, IUserReqModel  } from "models";
import { message } from "antd";

const Api = {
  getUsers: (query: Partial<IUserQueryOption>) => ({ method: "GET", url: queryString.stringifyUrl({url: 'users', query: {...query}}) } as IFetchProps),
  getUser: (id: string) => ({ method: "GET", url: `users/${id}` } as IFetchProps),
  putUser: (id: string, user: IUserReqModel) => ({ method: "PUT", url: `users/${id}`, body: user } as IFetchProps),  
}

export const UserService = {
  getUsers: async (query: Partial<IUserQueryOption>) => $fetch<IUserListRspModel>(Api.getUsers(query)),
  getUser: async (userId: string) => $fetch<IUserRspModel>(Api.getUser(userId)),
  putUser: async (userId: string, user: IUserReqModel) => $fetch(Api.putUser(userId, user)),  

  setErrorHandler: () => {
    const handler : (err: any) => void = (err: any) => {
      message.error(err)
    }

    setErrorHandler(handler)
  } 
}
