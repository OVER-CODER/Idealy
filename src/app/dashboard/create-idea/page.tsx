import PostIdea from '@/components/forms/PostIdea';
import { fetchUser } from '@/lib/actions/user.actions';
import {currentUser} from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

async function page () {
    const user = await currentUser();
    if(!user) return null;
    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding');



    return(
        <>
        <h1 className="head-text">Create Idea</h1>
        <PostIdea userId={userInfo._id} />
        </>
    )
}

export default page;