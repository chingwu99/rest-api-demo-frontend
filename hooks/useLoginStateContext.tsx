import { useContext } from "react";
import { LoginStateContext } from "@/contexts/LoginStateContext";

export const useLoginStateContext = () => {
  const context = useContext(LoginStateContext);

  if (!context) {
    throw Error("useLoginStateContext must be inside anProvider");
  }

  return context;
};
