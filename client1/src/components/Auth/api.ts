import { Apiclient } from "../../api/AxiosApi";

export async function registerAuth<T>(data: T) {
  try {
    return await Apiclient.post(`/auth/register`, data);
  } catch (error) {
    console.log("error", error)
    // alert("Register thất bại");
  }
}

export async function loginAuth<T>(data: T) {
  return await Apiclient.post(`/auth/login`, data);

 
}