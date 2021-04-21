import React from "react";
import Link from "next/link";
import MenuIcon from "@material-ui/icons/Menu";

interface HeaderProps {
  showMenu?: boolean;
  handleMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleMenuClick, showMenu }) => {
  return (
    <>
      <nav className="p-6 z-50 bg-gray-700 shadow-lg opacity-90 justify-between w-full hidden lg:flex">
        <div>
          <NavigationLink text="Cable Scheduler" href="/" sameTab />
        </div>
        <div>
          <NavigationLink text="Create New Schedule" href="/calendar" sameTab />
        </div>
      </nav>
      <nav className="p-6 z-50 bg-gray-700 shadow-lg opacity-90 justify-between w-full flex lg:hidden">
        <div>
          <div className={`${showMenu ? "block" : "hidden"}`}>
            <div className="cursor-pointer" onClick={handleMenuClick}>
              <MenuIcon className="text-white" />
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-x-8">
            <NavigationLink text="Create New Schedule" href="/calendar" sameTab />
          </div>
        </div>
      </nav>
    </>
  );
};

const NavigationLink: React.FC<{
  text: string;
  href?: string;
  sameTab?: boolean;
}> = ({ text, href, sameTab }) => {
  if (sameTab) {
    return (
      <div className="text-white font-semibold whitespace-nowrap">
        <Link href={href ?? ""}>{text}</Link>
      </div>
    );
  }
  return (
    <a href={href ?? ""} target="_blank" rel="noreferrer" className="text-white font-semibold">
      {text}
    </a>
  );
};

export default Header;
