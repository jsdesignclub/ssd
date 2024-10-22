import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiAirportSign1 } from 'react-icons/ci';
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/constat/navbar';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const linkClass = 'flex flex-row items-center gap-2 font-light px-3 py-1 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

export const Sidebar = () => {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = (key) => {
    setExpandedMenu(expandedMenu === key ? null : key);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex">
      <div className="lg:hidden p-2 h-16 bg-sky-700">
        <AiOutlineMenu onClick={toggleSidebar} className="text-2xl cursor-pointer text-secondary" />
      </div>
      <div className={classNames('bg-background  text-primary p-4 flex flex-col fixed lg:static transition-transform duration-300 transform h-full z-20', {
        'translate-x-0': sidebarOpen,
        '-translate-x-full lg:translate-x-0': !sidebarOpen,
      })}>
        <div className="flex justify-between items-center">
          <div className='flex items-center gap-3 py-2 px-3 text-accent'>
            <CiAirportSign1 fontSize={24} />
            <div className='text-lg font-bold'>Sunflower Marketing</div>
          </div>
          <AiOutlineClose onClick={closeSidebar} className="text-2xl cursor-pointer lg:hidden" />
        </div>
        <div className="py-8 flex flex-1 flex-col gap-0.5 text-accent">
          {DASHBOARD_SIDEBAR_LINKS.map((item) => (
            <SidebarLink key={item.key} 
              item={item}
              isExpanded={expandedMenu === item.key}
              onMenuClick={() => handleMenuClick(item.key)}
              closeSidebar={closeSidebar}
            />
          ))}
        </div>
        <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
          {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
            <SidebarLink22 key={item.key} item={item} closeSidebar={closeSidebar} />
          ))}
          <div className={classNames('text-neutral-400 cursor-pointer text-accent font-bold', linkClass)}>
            <span></span>
            Logout
          </div>
        </div>
      </div>
      {sidebarOpen && <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={closeSidebar}></div>}
    </div>
  );
};

function SidebarLink22({ item, closeSidebar }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = () => {
    closeSidebar();
    navigate(item.path);
  };

  return (
    <div
      className={classNames(pathname === item.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
      onClick={handleLinkClick}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </div>
  );
}

function SidebarLink({ item, isExpanded, onMenuClick, closeSidebar }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    closeSidebar();
    navigate(path);
  };

  if (item.subMenu) {
    return (
      <div>
        <div onClick={onMenuClick} className={classNames(pathname === item.path ? 'bg-neutral-700 text-accent' : 'text-neutral-400 cursor-pointer', linkClass)}>
          <span className="text-xl">{item.icon}</span>
          {item.label}
        </div>
        {isExpanded && (
          <div className="ml-4">
            {item.subMenu.map((subItem) => (
              <div
                key={subItem.key}
                className={classNames(pathname === subItem.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
                onClick={() => handleLinkClick(subItem.path)}
              >
                <span className="text-xl">{subItem.icon}</span>
                {subItem.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={classNames(pathname === item.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
      onClick={() => handleLinkClick(item.path)}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </div>
  );
}
