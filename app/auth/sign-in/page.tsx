"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginCredentials } from "@/schemas/auth";
import { signInWithEmail } from "./actions";
import Link from 'next/link';
import Image from 'next/image';

import { Input, Button } from "@/components";

export default function SignInForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(loginSchema), mode: "onBlur" });

  const onSubmit = async (data: LoginCredentials) => {
    setServerError(null);

    try {
      const result = await signInWithEmail(data);

      if (!result?.success)
        setServerError(`Error on submitting your request: ${result?.message}.`);

      reset();
    } catch (error) {
      setServerError(
        `An unexpected error occured: ${error}. Please try again later.`,
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-5 font-primary w-full">
      <div className="flex flex-col items-center justify-content bg-light rounded-2xl px-8 md:px-20 py-8 md:w-[50%]">
        <div className="mb-5">
          {/* <Image /> insert you logo here */}
          <h3 className="font-secondary font-semibold md:text-xl text-2xl">
            Learnaly
          </h3>
        </div>

        <div className="flex flex-col gap-8 text-center items-center mb-8">
          <h1 className="md:text-3xl text-5xl leading-12">
            Welcome to Learnaly
          </h1>

          <p className="md:text-sm text-lg tracking-tight leading-8 font-medium">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor,
            quia repellendus libero non quam quidem eaque quas cupiditate quo
            tempora voluptatum? Nostrum ullam, sit cum quis quasi vitae.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:gap-6 gap-8 md:w-xs w-full md:mb-8 mb-12 font-primary"
        >
          <Input
            type="email"
            aria-autocomplete="list"
            label="Email"
            inputSize="lg"
            breakpoint="md"
            id="email"
            placeholder="example@email.com"
            {...register('email', { required: true })}
            error={errors?.email?.message}
          />

          <Input
            type="password"
            label="Password"
            inputSize="lg"
            breakpoint="md"
            id="password"
            placeholder="*******"
            {...register('password', { required: true })}
            error={errors?.password?.message}
          />

          {serverError && (
            <div className="rounded-md px-3 py-2 text-sm font-medium text-red-500">
              {serverError}
            </div>
          )}

          <Button 
            size="lg"
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Sign In
          </Button>
        </form>

        <div className="font-mono text-slate-700 font-light flex flex-row gap-2 md:text-sm text-base">
          Doesn&apos;t have an account?
          <Link
            href="/auth/sign-up"
            className="text-black font-normal hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <div className="hidden md:flex flex-col items-center justify-content bg-light rounded-2xl p-5 w-[50%]">
        <Image
          src="https://placehold.co/600x400.png"
          alt="A placeholder image came from the placehold.co website"
          width={600}
          height={400}
          loading="eager"
          priority
        />
      </div>
    </div>
  );
}
