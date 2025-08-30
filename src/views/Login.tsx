import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiUrl } from "@/main";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, Check, CheckCircle2, LogInIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    username: z.string(),
    password: z.string(),
})

type LoginFormValues = z.infer<typeof formSchema>

function Login() {
    const [successOpen, setSuccessOpen] = useState(false)
    const [failedOpen, setFailedOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    const [jsonData, setJsonData] = useState({ "message": "Успех", "error": "Ошибка", "token": "Токен" })


    async function onSubmit(data: LoginFormValues) {
        setDialogOpen(false)

        const res = await fetch(apiUrl + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password
            })
        })

        const gotData = await res.json()

        setJsonData(gotData)

        if (res.ok) {
            localStorage.setItem("token", gotData.token)
            setSuccessOpen(true)
        } else {
            setFailedOpen(true)
        }
    }

    return <>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button className="w-36 shadow-lg">
                    <LogInIcon />
                    {"Вход"}
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-shadow-sm">
                        {"Вход в аккаунт"}
                    </DialogTitle>

                    <DialogDescription>
                        {"Вход в аккаунт OneProg Контеста"}
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
                                        <Input type="password" placeholder="Пароль..." {...field}></Input>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-38 border-md border-fuchsia-500 shadow-md" type="submit" variant="outline">
                            <CheckCircle2 />
                            {"Подтвердить"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >

        <AlertDialog open={successOpen} onOpenChange={setSuccessOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex gap-2">
                        <CheckCircle2 className="w-7 h-7 bg-emerald-400 rounded-full flex items-center justify-center" />

                        {"Успешно"}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        {jsonData.message}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setSuccessOpen(false)} className="w-18 border-md shadow-md" type="submit">
                        <Check />
                        {"ОК"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={failedOpen} onOpenChange={setFailedOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex gap-2">
                        <AlertCircleIcon className="w-7 h-7 bg-rose-500 rounded-full" />
                        {"Ошибка"}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        {jsonData.error}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setFailedOpen(false)} className="w-18 border-md shadow-md" type="submit">
                        <Check />
                        {"ОК"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
}

export default Login