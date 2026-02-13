"use client";
import React, { useState, useRef } from "react";
import {
    UserCircle,
    Image as ImageIcon,
    Type,
    Lightbulb,
    CheckCircle2,
    ChevronRight,
    Star,
    Sparkles,
    Copy,
    Download,
    ArrowLeft,
    Monitor,
    Camera,
    Info,
    Upload,
    Wand2,
    Check,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LinkedInOptimizer() {
    const [copiedSec, setCopiedSec] = useState<string | null>(null);
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [bannerImg, setBannerImg] = useState<string | null>(null);
    const [userBio, setUserBio] = useState(`I am a passionate Computer Science student dedicated to building scalable and user-centric software solutions. With a strong foundation in Full-Stack Web Development, I enjoy tackling complex logic and transforming ideas into functional applications.`);
    const [rawExp, setRawExp] = useState("");
    const [enhancedExp, setEnhancedExp] = useState("");
    const [isEnhancingExp, setIsEnhancingExp] = useState(false);
    const [evaluationResult, setEvaluationResult] = useState<{
        score: number;
        breakdown: { label: string; score: number; max: number; feedback: string }[];
        overallFeedback: string;
    } | null>(null);
    const [isEvaluating, setIsEvaluating] = useState(false);

    const profileInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);

    const copyToClipboard = (text: string, section: string) => {
        navigator.clipboard.writeText(text);
        setCopiedSec(section);
        setTimeout(() => setCopiedSec(null), 2000);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'banner') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'profile') setProfilePic(reader.result as string);
                else setBannerImg(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const enhanceExperience = () => {
        if (!rawExp) return;
        setIsEnhancingExp(true);

        // Mock AI Enhancement Logic
        setTimeout(() => {
            const mockResponses = [
                `• Architected and deployed a multi-tier application using React and Node.js, improving system scalability by 40%.\n• Optimized database performance through advanced indexing strategies, reducing query latency by 200ms.\n• Facilitated cross-functional collaboration using Agile methodologies to ensure on-time delivery of high-impact features.`,
                `• Engineered a real-time data processing pipeline that handled over 10k events per second with 99.9% reliability.\n• Revitalized legacy frontend modules with modern responsive components, boosting user retention metrics by 15%.\n• Authored comprehensive technical documentation and automated CI/CD workflows to streamline the development lifecycle.`,
                `• Spearheaded the development of an AI-integrated search engine, enhancing result accuracy and user satisfaction by 30%.\n• Implemented secure JWT-based authentication protocols to safeguard sensitive user data across distributed systems.\n• Developed reusable UI component libraries that reduced frontend development time for subsequent projects by 50%.`
            ];
            const result = mockResponses[Math.floor(Math.random() * mockResponses.length)];
            setEnhancedExp(result);
            setIsEnhancingExp(false);
        }, 2000);
    };

    const evaluateProfile = () => {
        setIsEvaluating(true);
        setTimeout(() => {
            const breakdown = [];

            // Profile Pic (20pts)
            const hasPic = !!profilePic;
            breakdown.push({
                label: "Profile Picture",
                score: hasPic ? 20 : 0,
                max: 20,
                feedback: hasPic ? "Visual identity established." : "Missing a professional headshot."
            });

            // Banner (20pts)
            const hasBanner = !!bannerImg;
            breakdown.push({
                label: "Professional Banner",
                score: hasBanner ? 20 : 0,
                max: 20,
                feedback: hasBanner ? "Great visual branding." : "A custom banner increases profile views by 11x."
            });

            // Bio (30pts)
            let bioScore = 0;
            if (userBio.length > 20) bioScore += 10;
            if (userBio.length > 150) bioScore += 10;
            if (/[0-9]%|increased|reduced|managed|led/i.test(userBio)) bioScore += 10;
            breakdown.push({
                label: "Bio / About Section",
                score: bioScore,
                max: 30,
                feedback: bioScore === 30 ? "Comprehensive and impact-driven." : bioScore > 10 ? "Good start, but add more metrics." : "Bio is too short or generic."
            });

            // Experience (30pts)
            let expScore = 0;
            if (enhancedExp) expScore += 20;
            else if (rawExp) expScore += 10;
            if (/[0-9]%|managed|built|developed/i.test(enhancedExp || rawExp)) expScore += 10;
            breakdown.push({
                label: "Experience Clarity",
                score: expScore,
                max: 30,
                feedback: expScore === 30 ? "Strong technical presence." : "Focus on quantifiable achievements."
            });

            const totalScore = breakdown.reduce((acc, curr) => acc + curr.score, 0);

            let feedback = "Your profile is promising! Focus on adding more quantifiable data.";
            if (totalScore > 85) feedback = "Excellent profile! You have a high chance of being noticed by recruiters.";
            else if (totalScore < 50) feedback = "Your profile needs immediate attention to attract opportunities.";

            setEvaluationResult({
                score: totalScore,
                breakdown,
                overallFeedback: feedback
            });
            setIsEvaluating(false);
        }, 1500);
    };

    const skills = [
        "Java", "Python", "JavaScript", "React.js", "Next.js",
        "Spring Boot", "REST APIs", "SQL & NoSQL", "Git & GitHub", "Cloud Computing (AWS/Azure)",
        "Problem Solving", "Team Collaboration", "Agile Methodologies", "Technical Writing", "Critical Thinking"
    ];

    return (
        <div className="min-h-screen bg-[#f3f2f0] dark:bg-black font-sans pb-12">
            {/* Header */}
            <header className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-white/10 py-4 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/jobs" className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-[#0a66c2]" /> LinkedIn Profile Optimizer
                        </h1>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 mt-8 space-y-8">
                {/* Intro Section */}
                <section className="bg-gradient-to-r from-[#0a66c2] to-[#004182] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl font-bold mb-3">Build a Professional Brand</h2>
                        <p className="text-blue-50 opacity-90 leading-relaxed">
                            Recruiters spend an average of 6 seconds on a profile. Make yours count with these AI-driven tips and professional templates designed for tech students.
                        </p>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Visual Assets */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Photo Upload */}
                        <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow-md">
                            <h3 className="font-bold flex items-center gap-2 mb-4">
                                <Camera className="w-5 h-5 text-[#0a66c2]" /> Profile Photo
                            </h3>
                            <div
                                onClick={() => profileInputRef.current?.click()}
                                className="relative rounded-full overflow-hidden mb-4 group aspect-square bg-gray-100 dark:bg-black border-4 border-white dark:border-neutral-800 flex items-center justify-center cursor-pointer shadow-inner"
                            >
                                {profilePic ? (
                                    <img
                                        src={profilePic}
                                        alt="Profile Pic"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <Camera className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Upload Photo</p>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <Upload className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={profileInputRef}
                                className="hidden"
                                accent-color="#0a66c2"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'profile')}
                            />
                            <div className="space-y-2 mt-4">
                                <Tip text="Wear a plain, formal shirt" />
                                <Tip text="Directly face the camera" />
                                <Tip text="Neutral background" />
                            </div>
                        </div>

                        {/* Banner Upload */}
                        <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow-md">
                            <h3 className="font-bold flex items-center gap-2 mb-4">
                                <Monitor className="w-5 h-5 text-[#0a66c2]" /> LinkedIn Banner
                            </h3>
                            <div
                                onClick={() => bannerInputRef.current?.click()}
                                className="relative rounded-lg overflow-hidden mb-4 aspect-[3/1] bg-gray-100 dark:bg-black flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-200 dark:border-white/10 hover:border-[#0a66c2] transition"
                            >
                                {bannerImg ? (
                                    <img
                                        src={bannerImg}
                                        alt="Banner"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center p-4">
                                        <ImageIcon className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Upload Custom Banner</p>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={bannerInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'banner')}
                            />
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-blue-50 dark:bg-blue-900/20 text-[#0a66c2] text-[10px] px-2 py-1 rounded-full font-bold">Standard: 1584 x 396</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Writing Sections */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About Section */}
                        <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold flex items-center gap-2">
                                    <Type className="w-5 h-5 text-[#0a66c2]" /> Bio Optimizer
                                </h3>
                                <div className="flex gap-4">
                                    <button
                                        onClick={evaluateProfile}
                                        disabled={isEvaluating}
                                        className="text-xs bg-green-500 text-white px-3 py-1 rounded-full font-bold hover:bg-green-600 transition flex items-center gap-1 disabled:opacity-50"
                                    >
                                        {isEvaluating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                                        Evaluate Full Profile
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(userBio, 'bio')}
                                        className="text-xs font-bold text-[#0a66c2] flex items-center gap-1 hover:underline"
                                    >
                                        {copiedSec === 'bio' ? 'Copied!' : <><Copy className="w-3 h-3" /> Copy Bio</>}
                                    </button>
                                </div>
                            </div>
                            <textarea
                                value={userBio}
                                onChange={(e) => setUserBio(e.target.value)}
                                className="w-full p-4 bg-gray-50 dark:bg-black/50 rounded-lg text-sm text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-[#0a66c2] min-h-[150px] outline-none focus:ring-1 focus:ring-[#0a66c2] transition"
                                placeholder="Enter your bio here..."
                            />
                        </div>

                        {/* Experience Rewriter */}
                        <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow-md">
                            <h3 className="font-bold flex items-center gap-2 mb-4 text-[#0a66c2]">
                                <Wand2 className="w-5 h-5" /> Experience Bullet Point Generator
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Your Raw Experience</p>
                                    <textarea
                                        value={rawExp}
                                        onChange={(e) => setRawExp(e.target.value)}
                                        placeholder="e.g. I worked at XYZ as an intern. I built a website using React and fixed some bugs."
                                        className="w-full p-4 bg-gray-50 dark:bg-black/50 rounded-lg text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/5 outline-none focus:border-[#0a66c2] transition min-h-[100px]"
                                    />
                                </div>

                                <button
                                    onClick={enhanceExperience}
                                    disabled={!rawExp || isEnhancingExp}
                                    className="w-full py-3 bg-[#0a66c2] text-white rounded-xl font-black text-sm hover:bg-[#004182] transition disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isEnhancingExp ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" /> Enhancing with AI...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4" /> Generate Professional Bullet Points
                                        </>
                                    )}
                                </button>

                                {enhancedExp && (
                                    <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-top-2">
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs font-black text-green-600 uppercase tracking-widest flex items-center gap-1">
                                                <Check className="w-3 h-3" /> Enhanced Version
                                            </p>
                                            <button
                                                onClick={() => copyToClipboard(enhancedExp, 'enhanced')}
                                                className="text-[10px] font-black text-[#0a66c2] uppercase tracking-widest hover:underline"
                                            >
                                                {copiedSec === 'enhanced' ? 'Copied' : 'Copy All'}
                                            </button>
                                        </div>
                                        <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg text-sm font-medium text-gray-800 dark:text-gray-200 border border-green-100 dark:border-green-900/30 whitespace-pre-wrap leading-relaxed">
                                            {enhancedExp}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow-md">
                            <h3 className="font-bold flex items-center gap-2 mb-4">
                                <Star className="w-5 h-5 text-yellow-500" /> Hot Skills (Recruiter Verified)
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {skills.map((skill, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs font-medium p-2 bg-gray-50 dark:bg-white/5 rounded-md border border-gray-100 dark:border-white/5">
                                        <CheckCircle2 className="w-3 h-3 text-green-500" /> {skill}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Guide Summary */}
                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/50 rounded-xl p-6">
                            <h3 className="font-bold text-amber-900 dark:text-amber-400 flex items-center gap-2 mb-3">
                                <Lightbulb className="w-5 h-5" /> Professionalism Checklist
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CheckItem text="Headline includes target role & skills" />
                                <CheckItem text="Contact info is verified & professional" />
                                <CheckItem text="Custom LinkedIn URL edited" />
                                <CheckItem text="Featured section includes your Resume PDF" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Evaluation Results Modal */}
            {evaluationResult && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-neutral-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
                        <div className="bg-[#0a66c2] p-8 text-white relative">
                            <div className="relative z-10 flex justify-between items-end">
                                <div>
                                    <p className="text-blue-100 text-xs font-black uppercase tracking-[0.2em] mb-2">Profile Audit Score</p>
                                    <h2 className="text-6xl font-black">{evaluationResult.score}<span className="text-2xl opacity-50">/100</span></h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-blue-100 text-xs font-black uppercase tracking-[0.2em] mb-2">Status</p>
                                    <span className={cn(
                                        "px-4 py-1 rounded-full text-xs font-black uppercase",
                                        evaluationResult.score > 80 ? "bg-green-400 text-green-950" : "bg-amber-400 text-amber-950"
                                    )}>
                                        {evaluationResult.score > 80 ? "Recruiter Ready" : "Needs Improvement"}
                                    </span>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {evaluationResult.breakdown.map((item, i) => (
                                    <div key={i} className="p-4 rounded-2xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</span>
                                            <span className="text-xs font-bold text-[#0a66c2]">{item.score}/{item.max}</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#0a66c2] transition-all duration-1000"
                                                style={{ width: `${(item.score / item.max) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-[11px] text-gray-500 font-medium italic">"{item.feedback}"</p>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                                <h4 className="text-sm font-black text-[#0a66c2] mb-2 flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4" /> AI Strategic Feedback
                                </h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                                    "{evaluationResult.overallFeedback}"
                                </p>
                            </div>

                            <button
                                onClick={() => setEvaluationResult(null)}
                                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-black transition shadow-xl"
                            >
                                Continue Optimizing
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Tip({ text }: { text: string }) {
    return (
        <li className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
            <ChevronRight className="w-3 h-3 text-[#0a66c2] mt-0.5" /> {text}
        </li>
    );
}

function CheckItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
            <CheckCircle2 className="w-4 h-4 text-amber-600" /> {text}
        </div>
    );
}
