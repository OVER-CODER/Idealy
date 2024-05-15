"use server"

import { revalidatePath } from "next/cache";
import Idea from "../models/idea.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import mongoose from "mongoose";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createIdea({text, author, communityId, path}: Params) {
    try {
        connectToDB();
        const createdIdea = await Idea.create(
            {
                text,
                author,
                community: null,
            }
        );
    
        await User.findByIdAndUpdate(author, {
            $push: {
                ideas: createdIdea._id,
            }
        });
        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Error creating Idea: ${error.message}`);
    }
}


export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();
try {
        const skipAmount = (pageNumber - 1) * pageSize;
    
        const postsQuery = Idea.find({parentId: {$in:[null, undefined]}})
            .sort({createdAt: 'desc'})
            .skip(skipAmount)
            .limit(pageSize)
            .populate({path: 'author', model: User})
            // .populate({path: 'community', model: Community})
            .populate({
                path: 'children',
                populate: {
                    path: 'author',
                    model: User,
                    select: "_id name parentId image"
                }
            });
    
            const totalPostsCount = await Idea.countDocuments({
                parentId: {$in: [null, undefined]} 
            });
    
            const posts = await postsQuery.exec();
    
            const isNext = totalPostsCount > skipAmount + posts.length;
    
            return {posts, isNext};
        
} catch (error: any) {
    console.error('Error fetching posts:', error);
        throw error;
    
} 
}

export async function fetchIdeaById(id: string) {
    connectToDB();

    try {


        const idea = await Idea.findById(id)
        .populate({
            path: 'author',
            model: User,
            select: "_id id name image"
        })
        .populate({
            path: 'children',
            populate: [
                {
                    path: 'author',
                    model: User,
                    select: "_id id name parentId image"
                },
                {
                    path: 'children',
                    model: Idea,
                    populate: {
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image"
                    }
                }
            ]
        }).exec();
        return idea;
    } catch (error: any) {
        throw new Error(`Error fetching idea: ${error.message}`);
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
        const orignalIdea = await Idea.findById(ideaId);
        if (!orignalIdea) {
            throw new Error('Idea not found');
        }

        const commentIdea = new Idea({
            text: commentText,
            author: userId,
            parentId: ideaId,
        })
        const savedCommentIdea = await commentIdea.save();

        orignalIdea.children.push(savedCommentIdea._id);
        await orignalIdea.save();

        revalidatePath(path);


    } catch (error: any) {
        throw new Error(`Error adding comment to Idea: ${error.message}`);
    }
}