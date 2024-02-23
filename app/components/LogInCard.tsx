"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LuAlertCircle } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";
import { LoginFormData } from "@/types";
import { loginHandler } from "@/lib/loginHandler";

type LogInCardProps = {
  setIsLogInCard: (value: boolean) => void;
};

const LogInCard: React.FC<LogInCardProps> = ({ setIsLogInCard }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = handleSubmit(async (data) => {
    await loginHandler(data);
    router.push("/list");
  });

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>登入</CardTitle>
        <CardDescription>登入以查看已到成員</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">電子信箱</Label>
              <Input
                id="email"
                type="text"
                placeholder="請輸入電子信箱"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <span className="  flex items-center">
                  <LuAlertCircle className="me-1" />
                  請輸入電子信箱
                </span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="  flex items-center">
                  <LuAlertCircle className="me-1" />
                  請輸入有效的電子信箱
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">密碼</Label>
              <Input
                id="password"
                type="password"
                placeholder="請輸入密碼"
                {...register("password", { required: true })}
              />
              {errors.password && errors.password.type === "required" && (
                <span className="  flex items-center">
                  <LuAlertCircle className="me-1" />
                  請輸入密碼
                </span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span className="  flex items-center">
                  <LuAlertCircle className="me-1" />
                  密碼長度需至少6碼
                </span>
              )}
            </div>
            <p className=" text-sm">
              還沒有簽到？
              <span
                className="cursor-pointer  border-b "
                onClick={() => setIsLogInCard(false)}
              >
                點此簽到
              </span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <label htmlFor="submit" id="submit">
            <input
              type="submit"
              id="submit"
              className={buttonVariants({ variant: "default" })}
              value="登入帳號"
            />
          </label>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LogInCard;