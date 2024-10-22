import React from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const bb = 'bg-gray-50 border py-4 px-4';

export const Header = () => {
  return (
    <div className='flex h-16 bg-primary px-2 justify-between items-center'>
      <div>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="search.."
          required
        />
      </div>
      <div className='flex items-center gap-3'>
        <Menu as="div" className="relative">
          <MenuButton className="text-sky-700">
            <IoMdNotificationsOutline fontSize={24} />
          </MenuButton>
          <MenuItems className={bb}>
            <MenuItem>
              <a className="block data-[focus]:bg-sky-800" href="/settings">
                Settings
              </a>
            </MenuItem>
            <MenuItem>
              <a className="block data-[focus]:bg-blue-100" href="/support">
                Support
              </a>
            </MenuItem>
            <MenuItem>
              <a className="block data-[focus]:bg-blue-100" href="/license">
                License
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>

        <Menu as="div" className="relative">
          <MenuButton className="text-sky-700">
            <MdOutlineMessage fontSize={24} />
          </MenuButton>
          <MenuItems className={bb}>
            <MenuItem>
              <a className="block data-[focus]:bg-blue-100" href="/settings">
                Settings
              </a>
            </MenuItem>
            <MenuItem>
              <a className="block data-[focus]:bg-blue-100" href="/support">
                Support
              </a>
            </MenuItem>
            <MenuItem>
              <a className="block data-[focus]:bg-blue-100" href="/license">
                License
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>

        <Menu as="div" className="relative">
          <MenuButton>
           
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
            <MenuItem>
              {({ active }) => (
                <a
                  href="/account"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center gap-2 px-4 py-2 text-gray-700`}
                >
                  <FaUser />
                  User Account
                </a>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <a
                  href="/settings"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center gap-2 px-4 py-2 text-gray-700`}
                >
                  <FaCog />
                  Settings
                </a>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <a
                  href="/logout"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center gap-2 px-4 py-2 text-gray-700`}
                >
                  <FaSignOutAlt />
                  Logout
                </a>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};
