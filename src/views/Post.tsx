import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { create } from "zustand";

interface PostData {
    id: number
    author: string
    title: string
    content: string
}

interface PostStore {
    posts: PostData[]
    loading: boolean
    error: string | null
    fetchPosts: () => void
}

const apiUrl = import.meta.env.VITE_API_URL

export const usePostStore = create<PostStore>((set) => ({
    posts: [],
    loading: true,
    error: null,
    fetchPosts: async () => {
        set({ loading: true })
        try {
            const res = await fetch(apiUrl + "/posts")
            const data: PostData[] = await res.json()
            set({ posts: data, loading: false })
        } catch (err: any) {
            console.error(err)
            set({ error: err.message, loading: false })
        }
    }
}));

function Post({ id, author, title, content }: PostData) {
    return (
        <Card className="shadow-lg">
            <CardHeader>
                <h1 className="text-2xl text-shadow-md">
                    {title}
                </h1>

                <h1 className="text-muted-foreground text-shadow-sm">
                    {"От: "} {author}
                </h1>

                <h1 className="text-muted-foreground text-shadow-sm">
                    {"Id поста: "} {id}
                </h1>
            </CardHeader>

            <CardContent>
                <h1 className="text-shadow-sm">
                    {content}
                </h1>
            </CardContent>

            <CardFooter>
                <Button variant="outline" className="shadow-md w-30">
                    <Heart />
                    {"Нравится"}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Post
