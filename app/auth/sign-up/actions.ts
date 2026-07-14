'use server';

import { auth } from '@/lib/auth/server';
import { redirect } from 'next/navigation';
import { registerSchema, RegisterCredentials } from '@/schemas/auth';

export async function signUpWithEmail(formData: RegisterCredentials) {
  const parsedPayload = registerSchema.safeParse(formData);

  if (!parsedPayload.success) return { 
    success: false,
    error: "Invalid data provided. Make sure to fill up all fields correctly." 
  };

  const { username, email, password, confirmPassword } = parsedPayload.data;

  if (confirmPassword !== password) return { 
    success: true,
    error: "Password doesn't match. Please re-enter again."
  };

  // Optionally restrict sign ups based on email address
  // if (!email.trim().endsWith("@my-company.com")) {
  //  return { error: 'Email must be from my-company.com' };
  // }

  try {
    const { error } = await auth.signUp.email({
      email,
      name: username,
      password
    });

    if (error) return { error: error?.message || "Failed to create your account." };

    // add the drizzle query here to insert the user's data into designated table for users before rediraction
  } catch (error) {
    return { 
      success: false,
      message: error || "An unexpected error occured during your sign-up request" 
    };
  }

  redirect('/');
}