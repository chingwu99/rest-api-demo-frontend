"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useLoginStateContext } from "@/hooks/useLoginStateContext";
import { MdLogout } from "react-icons/md";

const LogOutButton = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { loginState, setLoginState } = useLoginStateContext();

  const handleLogOut = () => {
    router.push("/");
    setLoginState(false);

    document.cookie = "HENRY-AUTH=;";
    document.cookie = "HENRY-AUTH-ID=;";

    toast({
      icon: "success",
      title: "您已經成功登出！",
    });
  };

  return (
    <>
      {loginState && (
        <Button className="mx-5 " onClick={() => handleLogOut()}>
          登出 <MdLogout size={20} className="mx-2" />
        </Button>
      )}
    </>
  );
};

export default LogOutButton;
