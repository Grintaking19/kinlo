import Avatar from "../layout/Avatar.jsx";
import IconButton from "../layout/IconButton.jsx";
// import LogoutIcon from "../../assets/icons/logout-icon.svg?react";
import { LogOut } from "lucide-react";
const UserRow = ({ fullName, username }) => {
  return (
    <div className="flex flex-row gap-3 items-center justify-between w-full">
      <Avatar size="md" />
      <div className="flex flex-col gap-0.5 items-start justify-start flex-1 min-w-0">
        <p className="font-semibold text-text truncate">{fullName}</p>
        <p className="text-text-secondary truncate">{username}</p>
      </div>
      <IconButton icon={<LogOut />} size="lg" aria-label="Logout" />
    </div>
  );
};

export default UserRow;
