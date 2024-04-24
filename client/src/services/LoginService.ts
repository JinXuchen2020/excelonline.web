import { $fetch, IFetchProps } from "./BaseService"
import queryString from 'query-string';
import { ITokenRspModel } from "../models";

const Api = {
  loginWithPhoneNumber: (phoneNumber: string) => ({ method: "GET", url: queryString.stringifyUrl({url: 'userToken/phoneNumber', query: {phoneNumber}}) } as IFetchProps),
}

export const LoginService = {
  loginWithPhoneNumber: async (phoneNumber: string) => $fetch<ITokenRspModel>(Api.loginWithPhoneNumber(phoneNumber))
}