import { Button } from "@/components/ui/button"
import { LogInIcon, LogOutIcon } from "lucide-react"

function Account() {
  return (
    <div className="flex flex-col gap-4 m-4">
      <h1 className="italic text-shadow-sm text-red-600">
        { "Вы не вошли в аккаунт" }
      </h1>

      <Button className="w-36 shadow-lg">
        <LogInIcon />
        { "Вход" }
      </Button>

      <Button className="w-36 shadow-lg">
        <LogOutIcon />
        { "Регистрация" }
      </Button>
    </div>
  )
}

export default Account
