import getUsers from "@/actions/getUsers";
import SideBar from "@/components/sidebar/SideBar";
import React from "react";
import UserList from "./components/UserList";

interface Props extends React.PropsWithChildren {}

const UsersLayout = async ({ children }: Props) => {
  const users = await getUsers();
  return (
    //@ts-expect-error Server Component
    <SideBar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </SideBar>
  );
};
export default UsersLayout;
