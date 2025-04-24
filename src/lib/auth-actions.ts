'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: response, error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  const { error: dbError } = await supabase.from('users').insert([
    {
      id: response.user.id,
      email: data.email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ])
  
  if (dbError) {
    redirect('/error') 
  }

  revalidatePath('/', 'layout')
  redirect('/check-your-email')
}

export const getUser = async () => {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error("Error fetching user: " + error.message);
    }
    return data?.user;
};
