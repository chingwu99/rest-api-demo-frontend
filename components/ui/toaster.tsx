"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { VscError } from "react-icons/vsc";
import { FaRegCircleCheck } from "react-icons/fa6";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        icon,
        ...props
      }) {
        return (
          <Toast
            key={id}
            {...props}
            duration={2000}
            className={` ${icon === "error" && ` border-red-500 bg-red-100`}  ${
              icon === "success" && ` border-green-700 bg-green-100`
            }`}
          >
            <div className="grid gap-1">
              <div
                className={`flex  items-center ${
                  icon === "error" && `text-red-500`
                } ${icon === "success" && `text-green-700`}`}
              >
                {icon === "success" && <FaRegCircleCheck size={20} />}
                {icon === "error" && <VscError size={20} />}
                {title && <ToastTitle className="mx-2">{title}</ToastTitle>}
              </div>

              {description && (
                <ToastDescription className="text-black">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
