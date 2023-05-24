import { DesktopSideBar } from "./DesktopSideBar";
import MobileFooter from "./MobileFooter";

interface Props extends React.PropsWithChildren {}

async function SideBar({ children }: Props) {
  return (
    <div className="h-full">
      <DesktopSideBar />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}
export default SideBar;
