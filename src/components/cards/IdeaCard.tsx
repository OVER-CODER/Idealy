import Image from "next/image";
import Link from "next/link";

interface Props {
    id: string,
    currentUserId: string,
    parentId: string | null,
    content: string,
    author:{
            id: string,
            name: string,
            image: string,
        }, 
    community: [
        {
            _id: string,
            name: string,
            image: string,
        }
    ] | null,
    createdAt: string,
    comments:{
        author:{
            image:string,
        }
    }[]
    isComment?: boolean;
}


const IdeaCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author, 
    community,
    createdAt,
    comments,
    isComment,

}: Props) =>{
    return(
        <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.id}`} className="relative h--11 w-11">
                            <Image 
                                src={author.image}
                                alt="Profile Picture"
                                fill
                                className="cursor-pointer rounded-full"
                            />
                        </Link>

                    </div>
                    <div className="flex flex-col">
                        <Link href={`/profile/${author.id}`} className="relative h--11 w-11">
                            <h4 className="cursore-pointer text-base-semibold text-light-1">
                                {author.name}
                            </h4>
                        </Link>
                        <p className="mt-2 text-small-regular text-light-2">
                            {content}
                        </p> 
                        <div className="mt-5 flex gap-3">
                            <Image src="/assets/heart-gray.svg" alt="heart" width={24} height={24} className="cursor-pointer object-contain"  />
                            <Link href={`/idea/${id}`}>
                            <Image src="/assets/reply.svg" alt="heart" width={24} height={24} className="cursor-pointer object-contain"  />
                            </Link>
                            <Image src="/assets/share.svg" alt="heart" width={24} height={24} className="cursor-pointer object-contain"  />
                        {isComment && comments.length > 0 && (
                            <Link href={`/idea/${id}`}>
                                <p className="mt-1 text-subtle-medium text-gray-100">{comments.length} replies </p>
                            </Link>
                        )} 
                        </div> 
                    </div>
                </div>
            </div>
            
        </article>
    )    
}

export default IdeaCard;