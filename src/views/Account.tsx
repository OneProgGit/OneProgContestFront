import { create } from "zustand/react";
import Login from "./Login";
import Register from "./Register"
import { apiUrl } from "@/main";
import { useEffect } from "react";
import type { UUID } from "crypto";

interface AccountData {
    username: string,
    hashed_password: string,
    id: UUID
    admin: boolean
}

interface AccountStore {
    account: AccountData | null
    loading: boolean
    error: string | null
    fetchAccount: () => void
}

export const useAccountStore = create<AccountStore>((set) => ({
    account: null,
    loading: true,
    error: null,
    fetchAccount: async () => {
        set({ loading: true })
        try {
            const res = await fetch(apiUrl + "/user", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
            })

            const data = await res.json()

            if (!res.ok) {
                set({ account: null, loading: false, error: data })
            } else {
                set({ account: data, loading: false })
            }
        } catch (err: any) {
            console.error(err)
            set({ error: err.message, loading: false, account: null })
        }
    }
}));

function Account() {
    const { account, loading, error, fetchAccount } = useAccountStore()
    const loggedIn = !!account

    useEffect(() => {
        fetchAccount()
    }, [fetchAccount])

    return (
        <div className="flex flex-col gap-2 m-4">
            {loggedIn ? (
                loading ? (
                    <h1 className="italic text-shadow-sm">{"Загрузка..."}</h1>
                ) : error ? (
                    <h1 className="italic text-shadow-sm text-red-600">
                        {"Не удалось получить данные аккаунта: "} {error}
                    </h1>
                ) : (
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                            <h1 className="italic text-shadow-sm">
                                {"Вы вошли в аккаунт под именем "}
                            </h1>
                            <h1 className="italic text-shadow-sm text-cyan-400">
                                {account?.username}
                            </h1>
                        </div>
                        <h1
                            className={`italic text-shadow-sm ${account?.admin ? "text-amber-400" : "text-blue-500"
                                }`}
                        >
                            {account?.admin ? "Вы админ" : "Вы не админ"}
                        </h1>
                    </div>
                )
            ) : (
                <>
                    <h1 className="italic text-shadow-sm text-red-600">
                        {"Вы не вошли в аккаунт"}
                    </h1>
                    <Register />
                    <Login />
                </>
            )}
        </div>
    )
}

export default Account
