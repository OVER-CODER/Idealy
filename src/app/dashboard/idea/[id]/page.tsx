import IdeaCard from "@/components/cards/IdeaCard";
import Comments from "@/components/forms/Comments";
import { fetchIdeaById } from "@/lib/actions/idea.actions";
import { fetchUser } from "@/lib/actions/user.actions";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async ({params}: {params: {id: string}}) =>{
    if(params.id) return null;

    const user = await currentUser();
    if(!user) return null;
    
    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding');

    const idea = await fetchIdeaById(params.id)

    return(
        <section className="relative">
        <div>
        <IdeaCard
            key={idea._id}
            id={idea._id}
            currentUserId={user?.id || ""}
            parentId={idea.parentId}
            content={idea.text}
            author={idea.author}
            createdAt={idea.createdAt}
            community={idea.community}
            comments={idea.children}
            />
        </div>
        <div className = "mt-7">
        <Comments 
            ideaId={idea._id}
            currentUserImg={userInfo.image}
            currentUserId={JSON.stringify(userInfo._id)}
        />
        </div>
        <div className="mt-10">
            {idea.children.map((childItem: any) => (
                <IdeaCard
                    key={childItem._id}
                    id={childItem._id}
                    currentUserId={childItem?.id || ""}
                    parentId={childItem.parentId}
                    content={childItem.text}
                    author={childItem.author}
                    createdAt={childItem.createdAt}
                    community={childItem.community}
                    comments={childItem.children}
                    isComment
                />
            ))}
        </div>
    </section>
    )
}

export default Page;