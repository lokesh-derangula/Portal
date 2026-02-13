"use client";
import React, { useState } from "react";
import { NoiseBackground } from "@/components/ui/noise-background";
import Head from "next/head";

export default function StudentPage() {
    const [formData, setFormData] = useState({
        name: "",
        skills: "",
        education: "",
    });

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

    const handleAIScreening = () => {
        // Mock AI Screening
        setAiAnalysis("Analysis in progress...");
        setTimeout(() => {
            setAiAnalysis(`
        ✅ Strong Candidate Profile
        - Skills match 85% of target roles.
        - Education is verified.
        ⚠️ Suggestion: Add more project details for higher visibility.
      `);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-black text-white relative">
            <NoiseBackground containerClassName="w-full min-h-screen flex items-center justify-center p-8">
                <div className="max-w-4xl w-full space-y-8 bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl z-20">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                        Student Profile & Management
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold">Personal Details</h2>
                            <input
                                name="name"
                                placeholder="Full Name"
                                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-pink-500 transition-all outline-none"
                                onChange={handleChange}
                            />
                            <textarea
                                name="skills"
                                placeholder="Skills (comma separated)"
                                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-pink-500 transition-all outline-none h-32"
                                onChange={handleChange}
                            />
                            <input
                                name="education"
                                placeholder="University / College"
                                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-pink-500 transition-all outline-none"
                                onChange={handleChange}
                            />

                            <div className="flex gap-4">
                                <button
                                    onClick={handleAIScreening}
                                    className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:shadow-lg hover:shadow-pink-500/30 transition-all font-bold"
                                >
                                    Run AI Resume Screening
                                </button>
                                <a href="/resume" className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all">
                                    Open Resume Builder
                                </a>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold">AI Assistant Feedback</h2>
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 min-h-[200px]">
                                {aiAnalysis ? (
                                    <pre className="whitespace-pre-wrap font-mono text-sm text-green-400">
                                        {aiAnalysis}
                                    </pre>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                        <p>No analysis run yet.</p>
                                        <p className="text-xs mt-2">Click mock AI screening to test.</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-4">Linked Accounts</h3>
                                <div className="flex gap-4">
                                    <a href="https://linkedin.com" target="_blank" className="flex items-center gap-2 p-3 bg-[#0077b5] rounded-lg">
                                        <span>Connect LinkedIn</span>
                                    </a>
                                    <a href="https://github.com" target="_blank" className="flex items-center gap-2 p-3 bg-[#333] rounded-lg">
                                        <span>Connect GitHub</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </NoiseBackground>

            {/* Footer */}
            <footer className="w-full py-20 px-8 flex flex-col items-center bg-black border-t border-white/5 relative z-10">
                <div className="relative group cursor-default mb-16">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative px-8 py-6 bg-black rounded-lg leading-none flex items-center">
                        <p className="text-2xl md:text-3xl font-black tracking-tighter text-center">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                "Practice makes man Better , but Mistakes makes man Perfect"
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-lg font-black shadow-lg">J</div>
                    <span className="text-xl font-black text-white tracking-tighter">JobNexus</span>
                </div>
                <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] mb-4">The Premium Career Hub © 2026</p>
                <p className="text-white/10 text-[10px] max-w-md text-center">Empowering students through AI-driven insights and professional connectivity.</p>
            </footer>
        </div>
    );
}
