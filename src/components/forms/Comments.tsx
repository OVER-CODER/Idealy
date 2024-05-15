"use client"

// import React, { useState } from 'react';
import * as z from 'zod';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { usePathname, useRouter } from 'next/navigation';

// import { updateUser } from '@/lib/actions/user.actions';
import { commentValidation } from '@/lib/validations/idea';
import { Input } from '../ui/input';
import Image from 'next/image';
import { addCommentToIdea } from '@/lib/actions/idea.actions';
// import { createIdea } from '@/lib/actions/idea.actions';


interface Props {
    ideaId: string,
    currentUserImg: string,
    currentUserId: string,
}

const Comments = ({ideaId, currentUserImg, currentUserId}: Props) => {
    
    
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            idea: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof commentValidation>) => {
        await addCommentToIdea(ideaId, values.idea, JSON.parse(currentUserId), pathname);

        form.reset();
        // const res = await updateUser(data);
        // if(res) router.push(pathname);
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col justify-start gap-10">
            <FormField
                    control={form.control}
                    name="idea"
                    render={({ field }) => (
                        <FormItem className='flex gap-3 items-center w-full'>
                        <FormLabel>
                            <Image 
                                src={currentUserImg}
                                alt="Profile Picture"
                                width={48}
                                height={48}
                                className="rounded-full object-cover"

                            />
                        </FormLabel>
                        <FormControl className='border-none bg-transparent'> 
                            <Input
                                type = 'text'
                                placeholder='Write your comment here'
                                className='no-focus text-light-1 outline-none'
                               {...field}
                            />
                        </FormControl>
                        
                        </FormItem>
                    )}
                    />
                   <Button type='submit' className='bg-primary-500'>
                    Comment
                    </Button> 
            </form>
        </Form>
    )
}

export default Comments;