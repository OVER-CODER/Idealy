import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import IdeaCard from "../cards/IdeaCard";
import { AnyARecord } from "dns";

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;

}

const IdeasTab = async ({currentUserId, accountId, accountType}:Props) => {
    
    let result = await fetchUserPosts(accountId);
    if(!result) redirect('/');
    return(
        <section className="mt-9 flex flex-col gap-10">
            {result.ideas.map((idea:any)=>(
                <IdeaCard
                    key={idea._id}
                    id={idea._id}
                    currentUserId={currentUserId}
                    parentId={idea.parentId}
                    content={idea.text}
                    author={
                        accountType === 'User'
                            ?{name:result.name, image: result.image, id: result.id}:
                        {name: idea.author.name, image: idea.author.image, id: idea.author.id}
                    }
                    createdAt={idea.createdAt}
                    community={idea.community}
                    comments={idea.children}
                />
            ))}
        </section>
    )
}

export default IdeasTab;