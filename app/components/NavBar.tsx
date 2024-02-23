import ModeToggle from "@/components/ui/ModeToggle";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center fixed top-0 left-0 right-0 w-full z-50 border-b bg-card text-card-foreground shadow-sm h-16 px-5">
      <div>會議簽到系統</div>
      <div className="flex justify-between items-center">
        <p className="mx-5">登出</p>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
