"use client";
import React from "react";
import Link from "next/link";
import {
    Youtube,
    ArrowRight,
    PlayCircle,
    BookOpen,
    GraduationCap,
    Code2,
    Globe,
    Briefcase,
    FileText,
    UserCircle,
    Home,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NoiseBackground } from "@/components/ui/noise-background";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const courses = [
    {
        title: "Telusko",
        desc: "Master Java, Python, Blockchain and more with Navin Reddy's simple and engaging teaching style.",
        link: "https://www.youtube.com/@telusko",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop",
        category: "Backend & Core",
        color: "from-blue-600 to-cyan-500"
    },
    {
        title: "Apna College",
        desc: "High-quality engineering courses by Shradha Khapra and Aman Dhattarwal. Top placement oriented preparation.",
        link: "https://www.youtube.com/@ApnaCollegeOfficial",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
        category: "Full Stack & DSA",
        color: "from-red-600 to-orange-500"
    },
    {
        title: "CodeWithHarry",
        desc: "Learn programming from scratch with Harry. Comprehensive tutorials on Web Dev, Python, and App Dev.",
        link: "https://www.youtube.com/@CodeWithHarry",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
        category: "Everything Code",
        color: "from-indigo-600 to-purple-500"
    },
    {
        title: "FreeCodeCamp",
        desc: "World's largest library of free coding tutorials. Verified certifications and hands-on projects.",
        link: "https://www.youtube.com/@freecodecamp",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
        category: "Certifications",
        color: "from-green-600 to-emerald-500"
    }
];

export default function CoursesPage() {
    return (
        <NoiseBackground containerClassName="min-h-screen bg-black font-sans text-white">
            {/* Transparent Fixed Navbar */}
            <nav className="w-full h-20 flex justify-between items-center px-8 z-[100] fixed top-0 left-0 bg-black/20 backdrop-blur-2xl border-b border-white/5 shadow-2xl">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-xl font-black text-2xl shadow-blue-500/20 shadow-lg">J</div>
                        <span className="text-2xl font-black text-white tracking-tighter">JobNexus</span>
                    </Link>
                </div>
                <div className="hidden md:flex items-center space-x-6 text-[10px] font-black text-white/80 uppercase tracking-widest">
                    <Link href="/" className="hover:text-blue-400 transition flex items-center gap-2">
                        <Home className="w-3 h-3" /> Home
                    </Link>
                    <Link href="/jobs" className="hover:text-blue-400 transition flex items-center gap-2">
                        <Briefcase className="w-3 h-3" /> Jobs
                    </Link>
                    <Link href="/resume" className="hover:text-blue-400 transition flex items-center gap-2">
                        <FileText className="w-3 h-3" /> Resume
                    </Link>
                    <Link href="/courses" className="text-blue-400 transition flex items-center gap-2">
                        <BookOpen className="w-3 h-3" /> Courses
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
                <div className="text-center space-y-4 mb-20">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] shadow-2xl mb-4">
                        <Sparkles className="w-4 h-4" /> Curated Learning Resources
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-4">
                        Master Your <span className="text-blue-500 italic">Skills.</span>
                    </h1>
                    <p className="text-white/40 text-lg font-medium max-w-2xl mx-auto">
                        We've handpicked the best YouTube channels to help you level up your engineering career. Redirect to free, high-quality education.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {courses.map((course, idx) => (
                        <CourseCard key={idx} course={course} />
                    ))}
                </div>

                {/* Footer Quote */}
                <footer className="mt-40 pt-20 border-t border-white/5 flex flex-col items-center">
                    <div className="relative group cursor-default">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative px-8 py-6 bg-black rounded-lg leading-none flex items-center">
                            <p className="text-2xl md:text-3xl font-black tracking-tighter text-center">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                    "Practice makes man Better , but Mistakes makes man Perfect"
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="mt-12 flex items-center gap-3">
                        <div className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-lg font-black shadow-lg">J</div>
                        <span className="text-xl font-black text-white tracking-tighter">JobNexus</span>
                    </div>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] mt-4 mb-20">The Premium Career Hub © 2026</p>
                </footer>
            </main>
        </NoiseBackground>
    );
}

function CourseCard({ course }: { course: any }) {
    return (
        <CardContainer className="inter-var w-full">
            <CardBody className="bg-neutral-900/50 relative group/card border-white/10 w-full h-auto rounded-[2.5rem] p-8 border backdrop-blur-sm hover:border-white/20 transition-all">
                <div className="flex justify-between items-start mb-6">
                    <CardItem translateZ="50" className="flex flex-col gap-1">
                        <h3 className={cn("text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r", course.color)}>
                            {course.category}
                        </h3>
                    </CardItem>
                    <CardItem translateZ="60" className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center border border-red-600/20">
                        <Youtube className="w-6 h-6 text-red-500" />
                    </CardItem>
                </div>

                <CardItem translateZ="100" className="w-full mb-8">
                    <img
                        src={course.image}
                        className="h-60 w-full object-cover rounded-2xl group-hover/card:shadow-2xl transition-all duration-500 grayscale group-hover/card:grayscale-0"
                        alt={course.title}
                    />
                </CardItem>

                <CardItem as="p" translateZ="60" className="text-white/50 text-sm font-medium leading-relaxed mb-8">
                    {course.desc}
                </CardItem>

                <div className="flex justify-between items-center">
                    <CardItem
                        translateZ={20}
                        as="a"
                        href={course.link}
                        target="_blank"
                        className="px-8 py-3 bg-white text-black rounded-xl text-xs font-black hover:bg-neutral-200 transition-all flex items-center gap-2"
                    >
                        Watch Now <ArrowRight className="w-4 h-4" />
                    </CardItem>
                    <CardItem
                        translateZ={20}
                        className="text-white/40 text-[12px] font-medium lowercase tracking-wider flex items-center gap-2"
                    >
                        <Youtube className="w-3 h-3 text-red-500/50" /> {course.title}
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}
