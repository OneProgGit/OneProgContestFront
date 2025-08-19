import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

function Tasks() {
  return (
    <div className="flex flex-col gap-4 m-4">
        <Button className="shadow-lg w-30">
            <Plus />
            { "Новая" }
        </Button>
    </div>
  )
}

export default Tasks
