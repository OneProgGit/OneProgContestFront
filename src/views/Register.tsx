import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LogOutIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const usernameSchema = z.string()
    .min(4, "Имя пользователя должно содержать минимум 4 символа")
    .max(16, "Имя пользователя не может содержать более 16 символов")
    .regex(/^\w+$/, "Имя пользователя может содержнать только буквы, цифры и нижние подчёркивания")

const passwordSchema = z.string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .max(32, "Пароль не может содержать более 32 символов")
    .regex(/[A-Z]/, "Пароль должен содержать минимум 1 заглавную букву")
    .regex(/[a-z]/, "Пароль должен содержать минимум 1 строчную букву")
    .regex(/\d/, "Пароль должен содержать минимум 1 цифру")
    .regex(/[!@#$%^&*(),.?":{}|<>+\-`~]/, "Пароль должен содержать минимум 1 специальный символ")

const formSchema = z.object({
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"]
})

type RegisterFormValues = z.infer<typeof formSchema>

function onSubmit(data: RegisterFormValues) {
    console.log(data)
}

function Register() {
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
        }
    })

    return <Dialog>
        <DialogTrigger asChild>
            <Button className="w-36 shadow-lg">
                <LogOutIcon />
                {"Регистрация"}
            </Button>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-shadow-sm">
                    {"Регистрация аккаунта"}
                </DialogTitle>
                
                <DialogDescription>
                    {"Регистрация аккаунта OneProg Контеста"}
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-shadow-sm">
                                    {"Имя пользователя"}
                                </FormLabel>

                                <FormControl>
                                    <Input placeholder="Имя пользователя..." {...field}></Input>
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
                                <FormLabel className="text-shadow-sm">
                                    {"Пароль"}
                                </FormLabel>

                                <FormControl>
                                    <Input placeholder="Пароль..." {...field}></Input>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-shadow-sm">
                                    {"Подтвердите пароль"}
                                </FormLabel>

                                <FormControl>
                                    <Input placeholder="Подтвердите пароль..." {...field}></Input>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="w-38 border-md border-rose-500 shadow-md" type="submit" variant="outline">
                        <CheckCircle2 />
                        {"Подтвердить"}
                    </Button>
                </form>
            </Form>
        </DialogContent>
    </Dialog >
}

export default Register