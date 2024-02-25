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
import { useToast } from "@/components/ui/use-toast";
import { useLoginStateContext } from "@/hooks/useLoginStateContext";

type LogInCardProps = {
  setIsLogInCard: (value: boolean) => void;
};

const LogInCard: React.FC<LogInCardProps> = ({ setIsLogInCard }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { setLoginState } = useLoginStateContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await loginHandler(data);

      if (res === "error") {
        console.log("yyyyyyyy");
        toast({
          icon: "error",
          title: "登入失敗！",
          description: "信箱與密碼錯誤，或帳號尚未註冊並簽到！",
        });
      } else {
        toast({
          icon: "error",
          title: "登入失敗！",
          description: "信箱與密碼錯誤，或帳號尚未註冊並簽到！",
        });

        toast({
          icon: "success",
          title: "登入成功！",
          description: "現在您可以查看已簽到成員，並修改個人資料。",
        });

        setLoginState(true);

        router.push("/list");
      }
    } catch (error) {
      toast({
        icon: "error",
        title: "登入失敗！",
        description: "信箱與密碼錯誤，或帳號尚未註冊並簽到！",
      });
      console.log("login error", error);
    }
  });

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>登入</CardTitle>
        <CardDescription>登入查看已簽到到成員</CardDescription>
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
                <span className="  flex items-center text-sm text-red-500">
                  <LuAlertCircle className="me-1" />
                  請輸入電子信箱
                </span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="  flex items-center text-sm text-red-500">
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
                <span className="  flex items-center text-sm text-red-500">
                  <LuAlertCircle className="me-1" />
                  請輸入密碼
                </span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span className="  flex items-center text-sm text-red-500">
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
              className={` cursor-pointer ${buttonVariants({
                variant: "default",
              })}`}
              value="登入帳號"
            />
          </label>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LogInCard;
