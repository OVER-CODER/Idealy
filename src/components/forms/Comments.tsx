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
        <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='idea'
            render={({ field }) => (
              <FormItem className='flex w-full items-center gap-3'>
                <FormLabel>
                  <Image
                    src={currentUserImg}
                    alt='current_user'
                    width={48}
                    height={48}
                    className='rounded-full object-cover'
                  />
                </FormLabel>
                <FormControl className='border-none bg-transparent'>
                  <Input
                    type='text'
                    {...field}
                    placeholder='Comment...'
                    className='no-focus text-light-1 outline-none'
                  />
                </FormControl>
              </FormItem>
            )}
          />
  
          <Button type='submit' className='comment-form_btn'>
            Reply
          </Button>
        </form>
      </Form>
    );
}

export default Comments;