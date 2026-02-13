"use client";
import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
        const body = isLogin ? { email, password } : { name, email, password };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                const hasResume = localStorage.getItem("user_resume");
                router.push(hasResume ? "/jobs" : "/resume");
            } else {
                setError(data.error || "Something went wrong");
            }
        } catch (error) {
            setError("Failed to connect to server");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <CardContainer className="inter-var">
                <CardBody className="bg-neutral-900 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-white/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                    <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-white"
                    >
                        {isLogin ? "Welcome Back, Job Seeker" : "Create Your Account"}
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-400 text-sm max-w-sm mt-2"
                    >
                        {isLogin
                            ? "Access personalized job recommendations and more."
                            : "Join the next-gen career hub for students."}
                    </CardItem>

                    {error && (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-xs">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                        {!isLogin && (
                            <CardItem translateZ="70" as="div" className="w-full">
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full Name"
                                    className="w-full p-4 rounded-lg bg-black border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-neutral-500"
                                />
                            </CardItem>
                        )}
                        <CardItem translateZ="80" as="div" className="w-full">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full p-4 rounded-lg bg-black border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-neutral-500"
                            />
                        </CardItem>
                        <CardItem translateZ="90" as="div" className="w-full">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full p-4 rounded-lg bg-black border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-neutral-500"
                            />
                        </CardItem>

                        <div className="flex flex-col gap-4 mt-8 w-full">
                            <CardItem
                                translateZ={20}
                                as="button"
                                type="submit"
                                disabled={isLoading}
                                className="w-full px-6 py-4 rounded-xl bg-white text-black text-sm font-black hover:bg-neutral-200 transition disabled:opacity-50"
                            >
                                {isLoading ? (isLogin ? "Signing in..." : "Creating account...") : (isLogin ? "Sign in" : "Sign Up")}
                            </CardItem>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError("");
                                }}
                                className="text-xs text-neutral-400 hover:text-white transition"
                            >
                                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                            </button>
                        </div>
                    </form>
                </CardBody>
            </CardContainer>
        </div>
    );
}
