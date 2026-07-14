'use server';

import { auth } from '@/lib/auth/server';
import { redirect } from 'next/navigation';
import { loginSchema, LoginCredentials } from "@/schemas/auth";

export async function signInWithEmail(formData: LoginCredentials) {
  const parsedPayload = loginSchema.safeParse(formData);

  if (!parsedPayload.success) return {
    success: false,
    error: "Invalid data provided. Make sure to fill up all fields correctly."
  };

  const { email, password } = parsedPayload.data;

  try {
    const { error } = await auth.signIn.email({
      email,
      password
    });
  
    if (error) {
      return { error: error?.message || 'Failed to sign in. Try again' };
    }

  } catch (error) {
    return {
      success: false,
      message: error || "An unexpected error occured during your sign-in request"
    }
  }

  redirect('/');
}