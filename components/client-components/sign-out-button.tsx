'use client';

import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

    const handleSignOut = async () => {
        setIsSigningOut(true);

        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push('/auth/sign-in');
                        router.refresh();
                    },
                },
            });
        } catch (error) {
            console.error(`Failed to sign out: ${error}`);
        } finally {
            setIsSigningOut(false);
        }
    };

    return (
        <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
            {isSigningOut ? "Signing out..." : "Sign Out"}
        </button>
    );
}