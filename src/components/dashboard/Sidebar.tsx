'use client';

import Link from "next/link"
import { IoHomeOutline, IoDocumentTextOutline, IoExitOutline, IoConstructOutline, IoApps, IoTicketOutline, IoPersonAddOutline, IoDesktopOutline, IoGlobeOutline } from "react-icons/io5"
import { SidebarLink, SidebarLinks } from "."
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <>
      <aside className={`overflow-y-auto scrollbar bg-gray-700 xl:bg-gray-800 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100lch-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : ''}`}>
        <SidebarLinks />
      </aside>
      <div className="relative">
        <div
          className={`z-50 fixed bottom-5 right-5 ${isSidebarOpen ? '-right-[calc(100vw-339px)]' : ''} bg-gray-200 py-4 text-2xl p-4 rounded-full cursor-pointer visible xl:hidden transition-all duration-300 text-gray-800`}
          onClick={toggleSidebar}
        >
          <IoApps />
        </div>
      </div>
    </>
  )
}