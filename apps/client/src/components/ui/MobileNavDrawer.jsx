import * as Dialog from "@radix-ui/react-dialog";
import SideNavItem from "../layout/SideNavItem.jsx";
import Button from "../layout/Button.jsx";
import { sideNavItems } from "../../config/Navigation.jsx";
import { Plus, Menu } from "lucide-react";
import IconButton from "../layout/IconButton.jsx";
import { useState } from "react";
import UserRow from "../ui/UserRow.jsx";
import Logo from "../layout/Logo.jsx";

const MobileNavDrawer = ({ currentPath = "/" }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
      <Dialog.Trigger asChild>
        <IconButton icon={<Menu />} size="md" aria-label="Open menu" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
        <Dialog.Content className="fixed left-0 top-0 h-full z-50 lg:hidden">
          <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>
          <Dialog.Description className="sr-only">
            This is a mobile navigation drawer.
          </Dialog.Description>
            <aside className="flex flex-col w-72 h-screen px-5 py-6 gap-1 justify-start items-start bg-bg border-r border-border">
                <Logo className="mb-10" />
                <nav className="flex flex-col gap-1 w-full mb-3">
                    {sideNavItems.map((item) => (
                        <SideNavItem
                            key={item.label}
                            href={item.href}
                            icon={item.icon}
                            iconClassName="w-5 h-5"
                            label={item.label}
                            aria-label={item.label}
                            active={currentPath === item.href}
                        />
                    ))}
                </nav>
                <Button
                    variant="primary"
                    gradient="save"
                    className="flex flex-row gap-2  w-full text-text font-semibold text-base leading-4.5 rounded-[10px] py-3.25"
                    icon={<Plus />}
                    aria-label="Create Post"
                >
                    Create a Post
                </Button>
                <div className="flex-1" />{" "}
                {/* this one genuinely IS a flex-spacer — pushes UserRow down */}
                <div className="border-t border-border self-stretch shrink-0" />
                <UserRow fullName="John Doe" username="@johndoe" />
            </aside>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MobileNavDrawer;
