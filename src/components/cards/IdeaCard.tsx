interface Props {
    id: string,
    currentUserId: string,
    parentId: string | null,
    content: string,
    author:[
        {
            _id: string,
            name: string,
            image: string,
        }
    ], 
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

}: Props) =>{
    return(
        <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
            <h2 className="text-small-regular text-light-2">
                {content}
            </h2>
        </article>
    )    
}

export default IdeaCard;