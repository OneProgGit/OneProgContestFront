import { useEffect } from "react";
import Post, { usePostStore } from "./Post"

function Home() {
  const { posts, loading, error, fetchPosts: fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="flex flex-col gap-2 m-4">
      <h1 className="text-xl text-shadow-sm"> 
        { "Новости" }
      </h1>
      
      {
        loading ? (
          <h1 className="italic text-shadow-sm">
            { "Загрузка..." }
          </h1>
        ) : (
          error ? (
            <h1 className="italic text-shadow-sm text-red-600">
              { "Не удалось получить новости: " } { error }
            </h1>
          ) : (
            posts.map(post => (
              <li key={post.id} className="list-none">
                <Post id={post.id} author={post.author} title={post.title} content={post.content}></Post>
              </li>
            ))
          )
        )
      }

    </div>
  )
}

export default Home
