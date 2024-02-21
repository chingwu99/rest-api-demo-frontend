"use client";

import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const loginHandler = async () => {
    const res = await axios.post("http://localhost:8080/auth/login", {
      email: "rr@gmail.com",
      password: "123",
    });

    console.log("isLogin", res);

    const { sessionToken } = res.data.authentication;
    const id = res.data._id;

    console.log("id", id);

    // 設定 cookie 的過期時間，這裡我們設定為一小時後過期
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 1 * 60 * 60 * 1000); // 1小時

    document.cookie = `HENRY-AUTH=${sessionToken}; expires=${expirationDate.toUTCString()};path=/`;
    document.cookie = `HENRY-AUTH-ID=${id}; expires=${expirationDate.toUTCString()};path=/`;

    router.push("/list");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Input id="framework" placeholder="Name of your project" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => loginHandler()}>Deploy</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
