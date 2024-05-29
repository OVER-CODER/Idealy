import { currentUser } from "@clerk/nextjs/server";
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import UserCard from "../cards/UserCard";

// import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;

//   const similarMinds = await fetchUser({
//     userId: user.id,
//     pageSize: 4,
//   });

//   const suggestedCOmmunities = await fetchCommunities({ pageSize: 4 });

  return (
    <>
    {/* <div className='topbar'>
      <div className='flex items-center gap-1'>
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer'>
                <Image
                  src='/assets/logout.svg'
                  alt='logout'
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
          />
      </div>
    </div> */}
    <section className='custom-scrollbar rightsidebar'>
    <div className='flex justify-start items-start gap-1'>
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer'>
                <Image
                  src='/assets/logout.svg'
                  alt='logout'
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
          />
      </div>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>
          Suggested Communities
        </h3>

        <div className='mt-7 flex w-[350px] flex-col gap-9'>
          {/* {suggestedCOmmunities.communities.length > 0 ? (
            <>
            {suggestedCOmmunities.communities.map((community) => (
              <UserCard
              key={community.id}
              id={community.id}
              name={community.name}
              username={community.username}
              imgUrl={community.image}
              personType='Community'
              />
              ))}
              </>
            ) : (
              <p className='!text-base-regular text-light-3'>
              No communities yet
              </p>
            )} */}
        </div>
      </div>

      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>Similar Minds</h3>
        <div className='mt-7 flex w-[350px] flex-col gap-10'>
          {/* {similarMinds.users.length > 0 ? (
            <>
            {similarMinds.users.map((person) => (
              <UserCard
              key={person.id}
              id={person.id}
              name={person.name}
              username={person.username}
              imgUrl={person.image}
              personType='User'
              />
            ))}
            </>
          ) : (
            <p className='!text-base-regular text-light-3'>No users yet</p>
          )} */}
        </div>
      </div>
    </section>
    </>
  );
}

export default RightSidebar;