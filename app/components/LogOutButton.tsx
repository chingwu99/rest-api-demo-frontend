"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useLoginStateContext } from "@/hooks/useLoginStateContext";

const LogOutButton = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { loginState, setLoginState } = useLoginStateContext();

  const handleLogOut = () => {
    document.cookie = "HENRY-AUTH=;";
    document.cookie = "HENRY-AUTH-ID=;";

    router.push("/");

    setLoginState(false);

    toast({
      title: "您已經成功登出！",
    });
  };

  return (
    <>
      {loginState && (
        <Button className="mx-5" onClick={() => handleLogOut()}>
          登出
        </Button>
      )}
    </>
  );
};

export default LogOutButton;
