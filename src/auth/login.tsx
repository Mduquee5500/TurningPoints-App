// Test user credentials
// Username: test@example.com
// Password: 1122

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useFetch from "@/lib/use-http.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth, UserProps } from "@/context/AuthContext.tsx";
import logo from "../assets/logo.svg";

interface ResponesProps extends UserProps {
  access_token: string;
}

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "email is required.",
  }),
  password: z.string().min(4, {
    message: "password is required.",
  }),
});

export const Login = () => {
  const { setUser } = useAuth();
  const { loading, fetchData } = useFetch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "test@example.com",
      password: "1122",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await fetchData<z.infer<typeof FormSchema>, ResponesProps>(
      "auth/login",
      "POST",
      data,
    );
    if (res && res.access_token) {
      localStorage.setItem("access_token", res?.access_token); // 存储 access_token
      setUser(res);
      toast.success("Login successfully!");
      navigate("/dashboard");
    }
  }

  return (
    <div className="flex w-full h-full sm:bg-custom-bg md:bg-custom-bg lg:bg-none">
      <div className="min-h-screen w-1/2 bg-white px-6 mx-auto flex flex-col items-center">
        {/* 图片紧贴顶部 */}
        <img src={logo} alt="Logo" className="self-center" />
        {/* 表单上下左右居中 */}
        <div className="flex-1 w-full flex items-center justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-4/5 space-y-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={loading} type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center sm:hidden md:hidden lg:block bg-custom-bg bg-cover bg-center" />
    </div>
  );
};
