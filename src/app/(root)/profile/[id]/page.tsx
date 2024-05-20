import PostIdea from '@/components/forms/PostIdea';
import { fetchUser } from '@/lib/actions/user.actions';
import {currentUser} from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Profileheader from '@/components/shared/ProfileHeader'; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { profileTabs } from '@/constants';
import IdeasTab from '@/components/shared/IdeasTab';


const Page = async ({params}:{params:{id: string}}) => {
    const user = await currentUser();
    if(!user) return null;
    const userInfo = await fetchUser(params.id);
    if (!userInfo?.onboarded) redirect("/onboarding");   

    return(
        <section>
            <Profileheader
                accountId = {userInfo.id}
                authUserId = {user.id}
                name = {userInfo.name}
                username = {userInfo.username}
                imgUrl = {userInfo.imgUrl}
                bio = {userInfo.bio}
            />

            <div className='mt-9'>
                <Tabs defaultValue='Ideas' className='w-full'>
                    <TabsList className='tab'>
                        {profileTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                                <Image 
                                    src={tab.icon} 
                                    alt={tab.label} 
                                    width={24} 
                                    height={24}
                                    className='object-contain'
                                />
                                <p className='max-sm:hidden'>{tab.label}</p>
                                {tab.label === 'Ideas' && (
                                    <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !test-tiny-medium text-light-2'>
                                        {userInfo?.ideas?.length || 0}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {profileTabs.map((tab) => (
                        <TabsContent key={`content-${tab.label}`} value={tab.value} className='w-full text-light-1'>
                            <IdeasTab
                            currentUserId={user.id}
                            accountId={userInfo.id}
                            accountType="User"
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}

export default Page;