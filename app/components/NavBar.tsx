import ModeToggle from "@/components/ui/ModeToggle";
import LogOutButton from "./LogOutButton";
import { BsFillClipboardCheckFill } from "react-icons/bs";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center fixed top-0 left-0 right-0 w-full z-50 border-b bg-card text-card-foreground shadow-sm h-16 px-5">
      <div className="flex items-center">
        <BsFillClipboardCheckFill size={26} className="mx-2" />
        會議簽到系統
      </div>
      <div className="flex justify-between items-center">
        <LogOutButton />

        <ModeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
