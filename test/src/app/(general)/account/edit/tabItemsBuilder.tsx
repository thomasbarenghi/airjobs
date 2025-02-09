import type { IUser } from "@/interfaces/user.interface";
import UserTab from "./_components/UserTab";
import CompanyTab from "./_components/CompanyTab";
import SecurityTab from "./_components/SecurityTab";
import type { KeyedMutator } from "swr";

interface TabBarItemProps {
  title: string;
  content: JSX.Element;
  visible?: boolean;
}

export const tabItemsBuilder = (
  loggedUser: IUser,
  mutate: KeyedMutator<string>
): TabBarItemProps[] => [
  {
    title: "Personal Info",
    content: <UserTab loggedUser={loggedUser} mutate={mutate} />,
    visible: true,
  },
  {
    title: "Security Info",
    content: <SecurityTab loggedUser={loggedUser} />,
    visible: true,
  },
  {
    title: "Company Info",
    content: <CompanyTab loggedUser={loggedUser} mutate={mutate} />,
    visible: loggedUser?.role === "company",
  },
];
