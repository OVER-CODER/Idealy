// // "use client"
// import IdeaCard from "@/components/cards/IdeaCard";
// import { fetchPosts } from "@/lib/actions/idea.actions";
// import { ClerkProvider, UserButton } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";
// export default async function Home() {
//   const result = await fetchPosts(1,30);
//   const user = await currentUser();
//   // console.log(result);

//   return (

//     <>
    

//     <div>

//         <UserButton />
      
//     </div>
//     <h1>Home</h1>
//     <section className="mt-9 flex flex-col gap-10">
//       {result.posts.length === 0 ? (
//         <p className="no-result">No posts found</p>
//       ):(
//         <>
//         {result.posts.map((post) => (
//           <IdeaCard
//             key={post._id}
//             id={post._id}
//             currentUserId={user?.id || ""}
//             parentId={post.parentId}
//             content={post.text}
//             author={post.author}
//             createdAt={post.createdAt}
//             community={post.community}
//             comments={post.children}
//           />
//         ))}
//         </>
//       ) }
//     </section>
    
//     </>
//   )
// }


import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import IdeaCard from "@/components/cards/IdeaCard";
import Pagination from "@/components/shared/Pagination";

import { fetchPosts } from "@/lib/actions/idea.actions";
import { fetchUser } from "@/lib/actions/user.actions";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  return (
    <>
      <h1 className='head-text text-left'>Home</h1>

      <section className='mt-9 flex flex-col gap-10'>
        {result.posts.length === 0 ? (
          <p className='no-result'>No ideas found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <IdeaCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Home;