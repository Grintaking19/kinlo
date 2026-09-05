import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Bell } from "lucide-react";
import IconButton from "../layout/IconButton.jsx";

const NotificationsDropdown = ({notifications = []}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <IconButton
          aria-label="Notifications"
          icon={<Bell />}
          size="lg"
          variant="minimal"
          className="hover:rounded-full data-[state=open]:bg-surface-3 data-[state=open]:rounded-full data-[state=open]:text-primary-400"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={5}
          className="w-80 rounded-lg bg-surface border border-border shadow-lg p-2 z-50"
        >
          <p className="px-2 py-1.5 text-sm font-semibold text-text">
            Notifications
          </p>
          <div className="flex flex-col  gap-1 max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="flex justify-center align-center px-2 py-1.5 text-sm text-text-muted">
                No notifications
              </p>
            ) : (
              notifications.map((notification, index) => (
                <DropdownMenu.Item
                  key={index}
                  className="px-2 py-1.5 text-sm text-text hover:bg-surface-2 rounded-md cursor-pointer"
                >
                  {notification}
                </DropdownMenu.Item>
              ))
            )}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default NotificationsDropdown;
