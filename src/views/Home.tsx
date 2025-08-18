import { useEffect } from "react";
import Post, { usePostStoreTest } from "./Post"

function Home() {
  const { posts, loading, error, fetchPosts: fetchPosts } = usePostStoreTest();

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
              <Post id={post.id} author={post.author} title={post.title} content={post.content}></Post>
            ))
          )
        )
      }

    </div>
  )
}

export default Home
