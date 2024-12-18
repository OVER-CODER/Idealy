"use server";


import { FilterQuery, SortOrder } from "mongoose";
import Idea from "../models/idea.model";
import User from "../models/user.model"
import { connectToDB } from "../mongoose"
import { revalidatePath } from "next/cache";
import { skip } from "node:test";
import Community from "../models/community.model";

interface Params {
    userId: string;
    path: string;
    username: string;
    name: string;
    image: string;
    bio: string;

}

export async function updateUser({
    userId,
    path,
    username,
    name,
    image,
    bio,
}: Params): Promise<void> {
  // Update user
  connectToDB();
  try {
    
    await User.findOneAndUpdate(
          { id: userId },
          {   
              username: username.toLowerCase(),
              name , 
              image, 
              bio,
              onboarded: true
          },
          { upsert: true }
          
      );
      if(path === '/profile/edit'){
          revalidatePath(path);
      }
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}


export async function fetchUser(userId: string) {
  try {
    connectToDB();
    return await User
    .findOne({ id: userId })
    .populate({
      path:'communities',
      model: Community
    })
  } catch (error: any) {
   throw new Error(`Error fetching user: ${error.message}`); 
  }
}


export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    const ideas = await User.findOne({ id: userId})
      .populate({
        path: 'ideas',
        model: Idea,
        populate: {
          path: 'children',
          model: Idea,
          populate: {
            path: 'author',
            model: User,
            select: 'name image id'
  
          }
        }
      })

      return ideas;
  } catch (error:any) {
    throw new Error(`Error fetching user posts: ${error.message}`);
  }
}


export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
} : {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, 'i'); 

    const query: FilterQuery <typeof User>= {
      id: { $ne: userId },
    }

    if(searchString.trim() !== ''){
      query.$or = [
        { username: {$regex: regex} },
        { name: {$regex: regex} }
      ]
    }

    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();
    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext};
  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDB();

    const userIdeas = await Idea.find({ author: userId });

    
    const childIdeaIds = userIdeas.reduce((acc, userIdea) => {
      return acc.concat(userIdea.children);
    }, []);

    
    const replies = await Idea.find({
      _id: { $in: childIdeaIds },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}