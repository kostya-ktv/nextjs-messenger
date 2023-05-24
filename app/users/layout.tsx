import SideBar from "@/components/sidebar/SideBar";
import React from "react";

interface Props extends React.PropsWithChildren {}

const UsersLayout = async ({ children }: Props) => {
  return (
    //@ts-expect-error Server Component
    <SideBar>
      <div className="h-full">{children}</div>
    </SideBar>
  );
};
export default UsersLayout;
