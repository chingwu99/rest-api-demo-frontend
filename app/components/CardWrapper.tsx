"use client";
import { useState } from "react";
import LogInCard from "./LogInCard";
import SiginCard from "./SignUpCard";
import { useLoginStateContext } from "@/hooks/useLoginStateContext";

const CardWrapper = () => {
  const [isloginCard, setIsLogInCard] = useState(false);
  const { loginState } = useLoginStateContext();

  return (
    <>
      {loginState === false &&
        loginState !== null &&
        (isloginCard ? (
          <LogInCard setIsLogInCard={setIsLogInCard} />
        ) : (
          <SiginCard setIsLogInCard={setIsLogInCard} />
        ))}
    </>
  );
};

export default CardWrapper;
