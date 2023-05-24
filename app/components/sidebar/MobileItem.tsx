"use client";
import { IRoute } from "@/hooks/useRoutes";
import clsx from "clsx";
import Link from "next/link";

interface Props extends IRoute {}

const MobileItem: React.FC<Props> = (props) => {
  const { active, href, icon: Icon, label, onClick } = props;
  const handleClick = () => {
    if (onClick) return onClick();
  };
  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `
    group
    flex
    gap-x-3
    text-sm
    leading-6
    font-semibold
    w-full
    justify-center
    p-4
    text-gray-500
    hover:text-black
    hover:bg-gray-100
    `,
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
