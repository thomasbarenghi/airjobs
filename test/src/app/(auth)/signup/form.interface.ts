import { UserForm } from "@/types/forms";
import { RoleEnum } from "@/types/user";

export interface RegisterForm extends UserForm {
  password: string;
  role: RoleEnum;
}
