'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterCredentials } from "@/schemas/auth";
import { signUpWithEmail } from './actions';

import { Input, Button } from "@/components";

export default function SignUpForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<RegisterCredentials>({ resolver: zodResolver(registerSchema), mode: "onBlur" });

  const onSubmit = async (data: RegisterCredentials) => {
    setServerError(null);

    try {
      const result = await signUpWithEmail(data);

      if (!result?.success) setServerError(`Error on submitting your form: ${result?.message}.`);

      reset();
    } catch (error) {
      setServerError(`An unexpected error occurred: ${error}. Please try again.`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 min-h-screen items-center justify-center bg-gray-900"
    >

      <div className="w-sm">
        <h1 className="mt-10 text-center text-2xl/9 font-bold text-white">Create new account</h1>
      </div>

      <Input 
        id="username"
        type="text"
        placeholder="learner021234"
        label="username"
        {...register('username', { required: true })}
        error={errors?.username?.message}
      />

      <Input 
        id="email"
        type="email"
        placeholder="example@email.com"
        label="email"
        {...register('email', { required: true })}
        error={errors?.email?.message}
      />

      <Input 
        id="password"
        type="password"
        placeholder="******"
        label="password"
        {...register('password', { required: true })}
      />

      <Input 
        id="confirmPassword"
        type="password"
        placeholder="******"
        label="confirm password"
        {...register('confirmPassword', { required: true })}
      />

      {serverError && (
        <div className="rounded-md px-3 py-2 text-sm text-red-500">
          {serverError}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        { isSubmitting ? 'Creating acccount...' : 'Create Account' }
      </Button>
    </form>
  );
}