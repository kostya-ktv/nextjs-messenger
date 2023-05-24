"use client";
import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  return isOpen ? null : (
    <div
      className="
        fixed 
        flex
        justify-between
        w-full
        bottom-0
        items-center
        bg-white
        border-t-[1px]
        lg:hidden
        "
    >
      {routes.map((route) => (
        <MobileItem {...route} key={route.label} />
      ))}
    </div>
  );
};

export default MobileFooter;
