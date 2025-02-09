import Endpoints from "@/utils/constants/endpoints.const";
import { postRequest } from "../apiRequests.service";
import { type IUser } from "@/interfaces/user.interface";

export const signupUser = async (values: IUser) => {
  const body = { ...values, birthday: values.birthday.toISOString() };

  const { data, error } = await postRequest(Endpoints.REGISTER, body, false);
  return { data, error };
};
