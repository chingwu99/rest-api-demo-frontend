import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type LoginStateContextProps = {
  loginState: boolean | null;
  setLoginState: (value: boolean) => void;
};

export const LoginStateContext = createContext<LoginStateContextProps>({
  loginState: null,
  setLoginState: () => "",
});

export const LoginStateProvider = (props: { children: React.ReactNode }) => {
  const [loginState, setLoginState] = useState<boolean | null>(null);

  const router = useRouter();

  useEffect(() => {
    //取出Token
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("HENRY-AUTH="))
      ?.split("=")[1];

    const tokenId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("HENRY-AUTH-ID="))
      ?.split("=")[1];

    if (!token || !tokenId) {
      setLoginState(false);
      return router.push("/");
    } else if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      setLoginState(true);
      return router.push("/list");
    }
  }, []);

  const value = {
    loginState,
    setLoginState,
  };

  return (
    <LoginStateContext.Provider value={value}>
      {props.children}
    </LoginStateContext.Provider>
  );
};
