import { IRoute } from "@/hooks/useRoutes";
import clsx from "clsx";
import Link from "next/link";

interface IDesktopItem extends IRoute {}

const DesktopItem: React.FC<IDesktopItem> = (props) => {
  const { active, href, icon: Icon, label, onClick } = props;

  const handleClick = () => {
    if (onClick) return onClick;
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
      group 
      flex 
      gap-x-3 
      rounded-md 
      p-3 
      text-sm 
      leading-6 
      font-semibold 
      text-grey-600 
      hover:text-black 
      hover:bg-grey-100
      `,
          active && "bg-gray-100"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
