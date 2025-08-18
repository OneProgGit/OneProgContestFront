import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { create } from "zustand";

interface PostData {
  id: number;
  author: string;
  title: string;
  content: string;
}

interface PostStore {
  posts: PostData[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  loading: true, 
  error: null,
  fetchPosts: async () => {
    set({ loading: true });
    try {
      const res = await fetch("code.oneprog.org/api/posts");
      const data: PostData[] = await res.json();
      set({ posts: data, loading: false });
    } catch (err: any) {
      console.error(err);
      set ( { error: err.message, loading: false } );
    }
  }
}));

export const usePostStoreTest = create<PostStore>((set) => ({
  posts: [],
  loading: true, 
  error: null,
  fetchPosts: async () => {
    set({ loading: false, posts: [ 
      { id: 0, author: "OneProg", title: "Тест", content: "Вау, это реально тест!" },
      { id: 1, author: "OneProg", title: "Светлая тема", content: "Светлая тема - топ!" },
      { id: 2, author: "OneProg", title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }
    ] });
  }
}));

function Post({ id, author, title, content } : PostData ) {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl text-shadow-md">
            { title }
        </h1>

        <h1 className="text-muted-foreground">
            { "От " } { author }
        </h1>

        <h1 className="text-muted-foreground">
            { "Id поста: " } { id }
        </h1>
      </CardHeader>

      <CardContent>
        <h1 className="text-shadow-sm">
            { content }
        </h1>
      </CardContent>

      <CardFooter>
        <Button variant="outline" size="icon">
          <Heart />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Post
