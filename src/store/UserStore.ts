import axios, { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import { ILoginFormData } from "../models/user";

interface IUserStore {
  isAuth: boolean;
  login: (data: ILoginFormData) => Promise<AxiosResponse<{ success: boolean }>>;
}

class UserStore implements IUserStore {
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  async login(data: ILoginFormData) {
    return await axios.post(`${process.env.REACT_APP_API_URL}/login`, data)
      .then((response) => {
        if (response.data) {
          this.isAuth = true;
          return response;
        }
        throw new Error(`Something went wrong`);
      })
      .catch((e) => Promise.reject(e));
  };
}

export default new UserStore();