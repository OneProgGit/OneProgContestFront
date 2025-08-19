import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, HomeIcon, ListTodo, Settings } from "lucide-react"
import Contests from "./views/Contests"
import Account from "./views/Account"
import Home from "./views/Home"
import Tasks from "./views/Tasks"

function App() {
  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex gap-2">
        <h1 className="text-shadow-md font-semibold text-4xl">
          { "OneProg" }
        </h1>

        <h1 className="text-shadow-md text-4xl text-red-500">
          { "Контест" }
        </h1>
      </div>

      <Tabs defaultValue="home">
        <TabsList className="shadow-lg">
          <TabsTrigger value="home">
            <HomeIcon />
            { "Главная" }
          </TabsTrigger>

          <TabsTrigger value="contests">
            <Code />
            { "Контесты" }
          </TabsTrigger>

          <TabsTrigger value="tasks">
            <ListTodo />
            { "Задачи" }
          </TabsTrigger>

          <TabsTrigger value="account">
            <Settings />
            { "Аккаунт" }
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home"><Home /></TabsContent>
        <TabsContent value="contests"><Contests /></TabsContent>
        <TabsContent value="tasks"><Tasks /></TabsContent>
        <TabsContent value="account"><Account /></TabsContent>
      </Tabs>
    </div>
  )
}

export default App
