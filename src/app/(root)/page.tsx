"use client"
import { fetchPosts } from "@/lib/actions/idea.actions";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
export default async function Home() {
  const result = await fetchPosts(1,30);
  const user = await currentUser();
  // console.log(result);

  return (

    <>
    <div>

        <UserButton />
      
    </div>
    <h1>Home</h1>
    <section className="mt-9 flex flex-col gap-10">
      {result.posts.length === 0 ? (
        <p className="no-result">No posts found</p>
      ):(
        <>
        {/* {result.posts.map((post) => (
          // <IdeaCard 
          //   key={post._id}
          //   id={post._id}
          //   currentUserId={user?.id}
          //   parentId={post.parentId}
          //   content={post.text}
          //   author={post.author}
          //   createdAt={post.createdAt}
          //   community={post.community}
          //   comments={post.children}
          // />
        ))} */}
        </>
      ) }
    </section>
    </>
  )
}
