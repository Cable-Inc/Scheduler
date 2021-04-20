import React from "react";
import Link from "next/link";
import def from "url";

const Header: React.FC = () => {
  return (
    <nav className="p-6 z-50 bg-gray-700 shadow-lg opacity-90 flex justify-between w-full">
      <div>
        <NavigationLink text="Cable Scheduler" href="/" sameTab />
      </div>
      <div>
        <NavigationLink text="Create New Schedule" href="/calendar" sameTab />
      </div>
    </nav>
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
