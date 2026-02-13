"use client";
import React from "react";
import Link from "next/link";
import {
    Globe3D
} from "@/components/ui/3d-globe";
import {
    Sparkles,
    Briefcase,
    ShieldCheck,
    Zap,
    ArrowRight,
    FileText,
    Laptop,
    Rocket,
    BrainCircuit,
    UserCircle,
    LayoutDashboard,
    Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { FocusCards } from "@/components/ui/focus-cards";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { NoiseBackground } from "@/components/ui/noise-background";

const sampleMarkers = [
    { lat: 40.7128, lng: -74.006, label: "New York" },
    { lat: 51.5074, lng: -0.1278, label: "London" },
    { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
    { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    { lat: 1.3521, lng: 103.8198, label: "Singapore" },
];

const portalCards = [
    {
        title: "AI Job Search",
        src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop",
    },
    {
        title: "Student Portal",
        src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    },
    {
        title: "Resume Builder",
        src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop",
    },
];

export default function Home() {
    return (
        <NoiseBackground containerClassName="min-h-screen bg-black font-sans text-white">
            {/* Transparent Fixed Navbar */}
            <nav className="w-full h-20 flex justify-between items-center px-8 z-[100] fixed top-0 left-0 bg-black/20 backdrop-blur-2xl border-b border-white/5 shadow-2xl">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-xl font-black text-2xl shadow-blue-500/20 shadow-lg">J</div>
                    <span className="text-2xl font-black text-white tracking-tighter">JobNexus</span>
                </div>
                <div className="hidden md:flex items-center space-x-6 text-[10px] font-black text-white/80 uppercase tracking-widest">
                    <Link href="/jobs" className="hover:text-blue-400 transition flex items-center gap-2">
                        <Briefcase className="w-3 h-3" /> Jobs
                    </Link>
                    <Link href="/student" className="hover:text-blue-400 transition flex items-center gap-2">
                        <Rocket className="w-3 h-3" /> AI Screening
                    </Link>
                    <Link href="/resume" className="hover:text-blue-400 transition flex items-center gap-2">
                        <FileText className="w-3 h-3" /> Resume
                    </Link>
                    <Link href="/linkedin-guide" className="hover:text-blue-400 transition flex items-center gap-2">
                        <UserCircle className="w-3 h-3" /> LinkedIn
                    </Link>
                    <Link href="/courses" className="hover:text-blue-400 transition flex items-center gap-2">
                        <Laptop className="w-3 h-3" /> Courses
                    </Link>
                    <Link href="/login" className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition shadow-lg shadow-blue-500/20 border border-blue-400/20">
                        Sign In
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative w-full h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <BackgroundGradientAnimation
                        gradientBackgroundStart="rgb(0, 5, 20)"
                        gradientBackgroundEnd="rgb(0, 0, 0)"
                    />
                </div>

                <div className="z-20 text-center max-w-6xl px-6 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] shadow-2xl mb-10">
                        <Sparkles className="w-4 h-4 animate-pulse" /> The Future of Professional Networking
                    </div>

                    <h1 className="text-6xl md:text-[7rem] font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl mb-8">
                        Global <span className="text-blue-500">Talent</span> <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 italic font-serif">Interconnected.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/50 font-medium max-w-2xl mx-auto leading-relaxed mb-12">
                        The ultimate hub for students and recruiters. Bridge the gap with AI-powered matching, global job feeds, and professional development.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/jobs" className="group px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-500 transition shadow-2xl shadow-blue-600/30 flex items-center gap-4">
                            Explore Portals <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition" />
                        </Link>
                        <Link href="/login" className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition flex items-center gap-3">
                            <LayoutDashboard className="w-5 h-5 text-blue-400" /> Member Login
                        </Link>
                    </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 py-10 z-10 opacity-30 pointer-events-none translate-y-32">
                    <Globe3D markers={sampleMarkers} />
                </div>
            </section>

            {/* AI Portal Selection - Focus Cards */}
            <section className="w-full max-w-7xl px-8 py-32 relative z-10 mx-auto">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-xs font-black text-blue-500 uppercase tracking-widest">Next-Gen Career Hub</h2>
                    <p className="text-4xl font-black text-white tracking-tighter">Step into specialized <span className="italic text-blue-400">ecosystems.</span></p>
                </div>
                <FocusCards cards={portalCards} />
                <div className="mt-12 flex justify-center gap-8 text-[10px] font-black uppercase text-white/30 tracking-widest">
                    <span className="flex items-center gap-2"><Globe className="w-3 h-3" /> Real-time Data</span>
                    <span className="flex items-center gap-2"><Zap className="w-3 h-3" /> AI Analysis</span>
                    <span className="flex items-center gap-2"><Briefcase className="w-3 h-3" /> Verified Listings</span>
                </div>
            </section>

            {/* Smart Features Grid */}
            <section className="w-full max-w-7xl px-8 py-20 relative z-10 mx-auto border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureBox
                        icon={<Laptop className="w-8 h-8" />}
                        title="Aggregated Jobs"
                        desc="Daily postings fetched from LinkedIn, Naukri, and Unstop using advanced AI scrapers."
                    />
                    <FeatureBox
                        icon={<BrainCircuit className="w-8 h-8" />}
                        title="AI Talent Match"
                        desc="Our neural network analyzes your resume to provide compatibility scores for every listing."
                        color="text-purple-500 shadow-purple-500/10"
                    />
                    <FeatureBox
                        icon={<ShieldCheck className="w-8 h-8" />}
                        title="Fraud Detection"
                        desc="Verification layer filters fake recruiters and provides identity protection for students."
                        color="text-emerald-500 shadow-emerald-500/10"
                    />
                </div>
            </section>

            {/* 3D Showcase Section */}
            <section className="w-full py-32 px-8 bg-neutral-950/50">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="max-w-xl space-y-8">
                        <div className="inline-block px-4 py-1.5 bg-blue-600/10 rounded-full border border-blue-600/20 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                            Premium Toolkit
                        </div>
                        <h2 className="text-5xl font-black text-white leading-tight tracking-tighter">Optimize Your <br /> <span className="text-blue-500">Professional DNA.</span></h2>
                        <p className="text-white/40 text-lg font-medium leading-relaxed">
                            Access our specialized LinkedIn profile optimizer and LaTeX resume builder to stand out in a global market.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/linkedin-guide" className="px-8 py-4 bg-white text-blue-900 rounded-xl font-black text-sm hover:bg-gray-100 transition shadow-xl">
                                LinkedIn Guide
                            </Link>
                            <Link href="/resume" className="px-8 py-4 border border-white/10 text-white rounded-xl font-black text-sm hover:bg-white/5 transition">
                                Resume Builder
                            </Link>
                        </div>
                    </div>

                    <CardContainer className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                                LinkedIn Profile Optimizer
                            </CardItem>
                            <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                                Get recruiter-ready with AI-driven profile tips and banners.
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img
                                    src="https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=800&auto=format&fit=crop"
                                    height="1000"
                                    width="1000"
                                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                    alt="thumbnail"
                                />
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem translateZ={20} as={Link} href="/linkedin-guide" className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                                    Try now →
                                </CardItem>
                                <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                                    Learn More
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
            </section>

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
        </NoiseBackground>
    );
}

function FeatureBox({ icon, title, desc, color = "text-blue-500 shadow-blue-500/10" }: any) {
    return (
        <div className={cn(
            "group p-10 bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/5 shadow-2xl transition-all duration-500",
            "hover:bg-white/10 hover:border-white/20 hover:-translate-y-3"
        )}>
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-black/40 border border-white/5 group-hover:scale-110 transition shadow-xl", color)}>
                {icon}
            </div>
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{title}</h3>
            <p className="text-white/40 font-medium text-sm leading-relaxed">
                {desc}
            </p>
        </div>
    );
}
