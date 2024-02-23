"use client";
// context 為 hook 必須在 react client components
// 但 children 可能是 react server components
// 因此透過此元件 ContextContainer 設定 context 並透過 { children } 預留 server components 位置
// 避免 context 子元件全部變成 react client components

import { LoginStateProvider } from "@/contexts/LoginStateContext";

const ContextContainer = (props: { children: React.ReactNode }) => {
  return <LoginStateProvider>{props.children}</LoginStateProvider>;
};

export default ContextContainer;
