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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LuAlertCircle } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";
import { loginHandler } from "@/lib/loginHandler";
import { useToast } from "@/components/ui/use-toast";
import { useLoginStateContext } from "@/hooks/useLoginStateContext";

type FormData = {
  email: string;
  password: string;
  username: string;
};

type SignUpCardProps = {
  setIsLogInCard: (value: boolean) => void;
};

const SignUpCard: React.FC<SignUpCardProps> = ({ setIsLogInCard }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { setLoginState } = useLoginStateContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const siginHandler = async (data: FormData) => {
    try {
      await axios.post("http://localhost:8080/auth/register", data);
    } catch (error) {
      return "error";
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      const siginRes = await siginHandler(data);

      if (siginRes === "error") {
        toast({
          icon: "error",
          title: "簽到失敗！",
          description: "您填寫的電子信箱已經被使用！",
        });

        return;
      }

      const loginRes = await loginHandler({ email: email, password: password });

      if (loginRes === "error") {
        toast({
          icon: "error",
          title: "簽到失敗！",
          description: "您填寫的電子信箱已經被使用！",
        });
        return;
      }

      toast({
        icon: "success",
        title: "簽到成功！",
        description: "現在您可以查看已簽到成員，並修改個人資料。",
      });

      setLoginState(true);

      router.push("/list");
    } catch (error) {
      console.log("註冊並簽到error", error);
      toast({
        icon: "error",
        title: "簽到失敗！",
        description: "您填寫的電子信箱已經被使用！",
      });
    }
  });

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>註冊並簽到</CardTitle>
        <CardDescription>請輸入您的基本基料</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">姓名</Label>
              <Input
                id="username"
                type="text"
                placeholder="請輸入姓名"
                {...register("username", {
                  required: true,
                })}
              />
              {errors.username && errors.username.type === "required" && (
                <span className="  flex items-center text-sm text-red-500">
                  <LuAlertCircle className="me-1" />
                  請輸入姓名
                </span>
              )}
            </div>
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
              <Label htmlFor="password">設定密碼</Label>
              <Input
                id="password"
                type="password"
                placeholder="請設定密碼"
                {...register("password", { required: true })}
              />
              {errors.password && errors.password.type === "required" && (
                <span className="  flex items-center text-sm text-red-500">
                  <LuAlertCircle className="me-1" />
                  請設定密碼
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
              已簽到？
              <span
                className="cursor-pointer  border-b "
                onClick={() => setIsLogInCard(true)}
              >
                點此登入
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
              value="點此簽到"
            />
          </label>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignUpCard;
