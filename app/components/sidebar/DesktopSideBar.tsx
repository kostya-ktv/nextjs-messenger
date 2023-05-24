"use client";

import useRoutes from "@/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";

interface Props {}

export const DesktopSideBar = (props: Props) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className="
  hidden
  lg:fixed
  lg:inset-y-0
  lg:left-0
  lg:z-40
  lg:w-20
  xl:px-6
  lg:overflow-y-auto
  lg:bg-white
  lg:border-r-[1px]
  lg:pb-4
  lg:flex
  lg:flex-col
  justify-between
  "
    >
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map((item) => (
            <DesktopItem {...item} key={item.label} />
          ))}
        </ul>
      </nav>
    </div>
  );
};