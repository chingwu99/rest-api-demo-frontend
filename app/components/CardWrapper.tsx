"use client";
import { useState } from "react";
import LogInCard from "./LogInCard";
import SiginCard from "./SignUpCard";

const CardWrapper = () => {
  const [isloginCard, setIsLogInCard] = useState(false);

  return (
    <>
      {isloginCard ? (
        <LogInCard setIsLogInCard={setIsLogInCard} />
      ) : (
        <SiginCard setIsLogInCard={setIsLogInCard} />
      )}
    </>
  );
};

export default CardWrapper;
