// "use server"

// import { revalidatePath } from "next/cache";
// import Idea from "../models/idea.model";
// import User from "../models/user.model";
// import { connectToDB } from "../mongoose";
// import mongoose from "mongoose";

// interface Params {
//     text: string,
//     author: string,
//     communityId: string | null,
//     path: string,
// }

// export async function createIdea({text, author, communityId, path}: Params) {
//     try {
//         connectToDB();
//         const createdIdea = await Idea.create(
//             {
//                 text,
//                 author,
//                 community: null,
//             }
//         );
    
//         await User.findByIdAndUpdate(author, {
//             $push: {
//                 ideas: createdIdea._id,
//             }
//         });
//         revalidatePath(path);
//     } catch (error: any) {
//         throw new Error(`Error creating Idea: ${error.message}`);
//     }
// }


// export async function fetchPosts(pageNumber = 1, pageSize = 20) {
//     connectToDB();
// try {
//         const skipAmount = (pageNumber - 1) * pageSize;
    
//         const postsQuery = Idea.find({parentId: {$in:[null, undefined]}})
//             .sort({createdAt: 'desc'})
//             .skip(skipAmount)
//             .limit(pageSize)
//             .populate({path: 'author', model: User})
//             // .populate({path: 'community', model: Community})
//             .populate({
//                 path: 'children',
//                 populate: {
//                     path: 'author',
//                     model: User,
//                     select: "_id name parentId image"
//                 }
//             });
    
//             const totalPostsCount = await Idea.countDocuments({
//                 parentId: {$in: [null, undefined]} 
//             });
    
//             const posts = await postsQuery.exec();
    
//             const isNext = totalPostsCount > skipAmount + posts.length;
    
//             return {posts, isNext};
        
// } catch (error: any) {
//     console.error('Error fetching posts:', error);
//         throw error;
    
// } 
// }

// export async function fetchIdeaById(id: string) {
//     connectToDB();

//     try {


//         const idea = await Idea.findById(id)
//         .populate({
//             path: 'author',
//             model: User,
//             select: "_id id name image"
//         })
//         .populate({
//             path: 'children',
//             populate: [
//                 {
//                     path: 'author',
//                     model: User,
//                     select: "_id id name parentId image"
//                 },
//                 {
//                     path: 'children',
//                     model: Idea,
//                     populate: {
//                         path: 'author',
//                         model: User,
//                         select: "_id id name parentId image"
//                     }
//                 }
//             ]
//         }).exec();
//         return idea;
//     } catch (error: any) {
//         throw new Error(`Error fetching idea: ${error.message}`);
//     }
// }


// export async function addCommentToIdea(
//     ideaId: string,
//     commentText: string,
//     userId: string,
//     path: string
// ) {
//     connectToDB();
//     try {
//         const orignalIdea = await Idea.findById(ideaId);
//         if (!orignalIdea) {
//             throw new Error('Idea not found');
//         }

//         const commentIdea = new Idea({
//             text: commentText,
//             author: userId,
//             parentId: ideaId,
//         })
//         const savedCommentIdea = await commentIdea.save();

//         orignalIdea.children.push(savedCommentIdea._id);
//         await orignalIdea.save();

//         revalidatePath(path);


//     } catch (error: any) {
//         throw new Error(`Error adding comment to Idea: ${error.message}`);
//     }
// }


"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Idea from "../models/idea.model";
import Community from "../models/community.model";


export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;
  
  const postsQuery = Idea.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "community",
      model: Community,
    })
    .populate({
      path: "children", // Populate the children field
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    });
  const totalPostsCount = await Idea.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of posts

  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

interface Params {
  text: string,
  author: string,
  communityId: string | null,
  path: string,
}

export async function createIdea({ text, author, communityId, path }: Params) {
  try {
    connectToDB();

    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );

    const createdIdea = await Idea.create({
      text,
      author,
      community: communityIdObject, // Assign communityId if provided, or leave it null for personal account
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { ideas: createdIdea._id },
    });

    if (communityIdObject) {
      // Update Community model
      await Community.findByIdAndUpdate(communityIdObject, {
        $push: { ideas: createdIdea._id },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create idea: ${error.message}`);
  }
}

async function fetchAllChildIdeas(ideaId: string): Promise<any[]> {
  const childIdeas = await Idea.find({ parentId: ideaId });

  const descendantIdeas = [];
  for (const childIdea of childIdeas) {
    const descendants = await fetchAllChildIdeas(childIdea._id);
    descendantIdeas.push(childIdea, ...descendants);
  }

  return descendantIdeas;
}

export async function deleteIdea(id: string, path: string): Promise<void> {
  try {
    connectToDB();

    const mainIdea = await Idea.findById(id).populate("author community");

    if (!mainIdea) {
      throw new Error("Idea not found");
    }
    const descendantIdeas = await fetchAllChildIdeas(id);

    
    const descendantIdeaIds = [
      id,
      ...descendantIdeas.map((idea) => idea._id),
    ];
    const uniqueAuthorIds = new Set(
      [
        ...descendantIdeas.map((idea) => idea.author?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainIdea.author?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    const uniqueCommunityIds = new Set(
      [
        ...descendantIdeas.map((idea) => idea.community?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainIdea.community?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    
    await Idea.deleteMany({ _id: { $in: descendantIdeaIds } });

    // Update User model
    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { ideas: { $in: descendantIdeaIds } } }
    );

    // Update Community model
    await Community.updateMany(
      { _id: { $in: Array.from(uniqueCommunityIds) } },
      { $pull: { ideas: { $in: descendantIdeaIds } } }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete idea: ${error.message}`);
  }
}

export async function fetchIdeaById(ideaId: string) {
  connectToDB();

  try {
    const idea = await Idea.findById(ideaId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      }) // Populate the author field with _id and username
      .populate({
        path: "community",
        model: Community,
        select: "_id id name image",
      }) // Populate the community field with _id and name
      .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within children
            model: User,
            select: "_id id name parentId image", // Select only _id and username fields of the author
          },
          {
            path: "children", // Populate the children field within children
            model: Idea,
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec();

    return idea;
  } catch (err) {
    console.error("Error while fetching idea:", err);
    throw new Error("Unable to fetch idea");
  }
}

export async function addCommentToIdea(
  ideaId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();

  try {
    
    const originalIdea = await Idea.findById(ideaId);

    if (!originalIdea) {
      throw new Error("Idea not found");
    }
    const commentIdea = new Idea({
      text: commentText,
      author: userId,
      parentId: ideaId,
    });

    
    const savedCommentIdea = await commentIdea.save();

    
    originalIdea.children.push(savedCommentIdea._id);

    
    await originalIdea.save();

    revalidatePath(path);
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
}