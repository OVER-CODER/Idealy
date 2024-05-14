"use server"

import { on } from "events";
import User from "../models/user.model"
import { connectToDB } from "../mongoose"
import { revalidatePath } from "next/cache";
import { string } from "zod";

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
    // .populate({
    //   path:'communities',
    //   model: Community
    // })
  } catch (error) {
   throw new Error(`Error fetching user: ${error.message}`); 
  }
}