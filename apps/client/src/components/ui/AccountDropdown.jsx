import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User, Settings, LogOut, Moon, HelpCircle } from "lucide-react";
import Avatar from "../layout/Avatar.jsx";
import { RouterLink } from "../../lib/router.jsx";
import ToggleButton from "../layout/ToggleButton.jsx";

const AccountDropdown = () => {
  const [darkMode, setDarkMode] = React.useState(true);
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Account Settings"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-2 hover:bg-surface-3 hover:cursor-pointer data-[state=open]:bg-surface-3 data-[state=open]:border data-[state=open]:border-primary-400 data-[state=open]:ring-2 data-[state=open]:ring-primary-400 transition-colors duration-200 ease-in-out"
        >
          <Avatar
            size="md"
            wrapperClassName="hover:border-2 hover:border-primary"
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={5}
          className="w-65 rounded-lg bg-surface border border-border shadow-lg p-2 z-50"
        >
          <DropdownMenu.Item asChild>
            <RouterLink
              href="/profile"
              className="flex items-center gap-2 px-2 py-1.5 text-sm text-text hover:bg-surface-2 rounded-md cursor-pointer"
            >
              <User size={16} />
              View Profile
            </RouterLink>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild>
            <RouterLink
              href="/settings"
              className="flex items-center gap-2 px-2 py-1.5 text-sm text-text hover:bg-surface-2 rounded-md cursor-pointer"
            >
              <Settings size={16} />
              Settings
            </RouterLink>
          </DropdownMenu.Item>

          {/* Dark Mode Toggle */}
          <div
            className="flex items-center justify-between px-2 py-1.5 text-sm text-text hover:bg-surface-2 rounded-md cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setDarkMode(!darkMode);
            }}
          >
            <span className="flex items-center gap-2">
              <Moon size={16} />
              Dark Mode
            </span>
            <ToggleButton
              on={darkMode}
              setOn={setDarkMode}
              aria-label="Toggle dark mode"
            />
          </div>

          <DropdownMenu.Item asChild>
            <RouterLink
              href="/help"
              className="flex items-center gap-2 px-2 py-1.5 text-sm text-text hover:bg-surface-2 rounded-md cursor-pointer"
            >
              <HelpCircle size={16} />
              Help and Support
            </RouterLink>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-border" />
          <DropdownMenu.Item
            onSelect={() => {
              /* logout handler — wire up once Clerk lands (Day 5) */
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-500 hover:bg-surface-2 outline-none data-[highlighted]:bg-surface-2 cursor-pointer"
          >
            <LogOut size={16} /> Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default AccountDropdown;
