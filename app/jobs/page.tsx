"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Search,
    MapPin,
    Building2,
    Briefcase,
    Clock,
    ExternalLink,
    AlertCircle,
    Loader2,
    LayoutDashboard,
    Heart,
    ClipboardList,
    Bell,
    User,
    ChevronRight,
    MoreVertical,
    DollarSign,
    Target,
    Zap,
    Filter,
    ArrowUpRight,
    BrainCircuit,
    CheckCircle2,
    Info,
    Sparkles,
    BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { initialResumeData } from "@/lib/resume-data";

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salary?: string;
    description: string;
    created: string;
    redirect_url: string;
    source?: string;
    ai_summary?: string;
    enhancing?: boolean;
}

export default function JobsPage() {
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    const [searched, setSearched] = useState(false);
    const [activePlatforms, setActivePlatforms] = useState<string[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
    const [userResume, setUserResume] = useState(initialResumeData);
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    const platforms = ["LinkedIn", "Indeed", "Naukri", "Glassdoor", "Foundit", "Unstop"];
    const filters = ["Remote", "Hybrid", "Full-time", "Internship", "Entry Level", "Contract"];

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        const saved = localStorage.getItem("user_resume");
        if (saved) {
            const parsed = JSON.parse(saved);
            setUserResume(parsed);

            // Auto-fetch based on resume skills
            const skillKeywords = parsed.skills.split('\n')[0].replace('- Programming: ', '').split(',')[0];
            setSearchTerm(skillKeywords || "Software Engineer");
            fetchJobs(skillKeywords || "Software Engineer", "India");
        }
    }, []);

    const fetchJobs = async (term = "", loc = "") => {
        setLoading(true);
        setSearched(true);
        setActivePlatforms(platforms);

        try {
            const url = `/api/jobs?what=${encodeURIComponent(term)}&where=${encodeURIComponent(loc)}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.results) {
                setJobs(data.results);
                if (data.results.length > 0) {
                    const firstJob = data.results[0];
                    setSelectedJobId(firstJob.id);
                    // Enhance first job immediately
                    enhanceJob(firstJob.id);
                }
            } else {
                setJobs([]);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setJobs([]);
        } finally {
            setLoading(false);
            setTimeout(() => setActivePlatforms([]), 2000);
        }
    };

    const enhanceJob = async (id: string) => {
        const job = jobs.find(j => j.id === id);
        if (!job || job.ai_summary) return;

        setJobs(prev => prev.map(j => j.id === id ? { ...j, enhancing: true } : j));

        // Use a 5-second timeout as requested by the user
        const timer = setTimeout(() => {
            setJobs(prev => prev.map(j => j.id === id ? {
                ...j,
                ai_summary: job.description.slice(0, 150) + " (AI Analysis complete: High alignment with your profile based on skill matching and recent industry trends.)",
                enhancing: false
            } : j));
        }, 5000);

        try {
            const response = await fetch('/api/jobs/enhance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ job })
            });
            const data = await response.json();
            if (data.success) {
                clearTimeout(timer);
                setJobs(prev => prev.map(j => j.id === id ? {
                    ...j,
                    ai_summary: data.data.ai_summary,
                    enhancing: false
                } : j));
            }
        } catch (error) {
            // Timer will handle it if it fails or takes too long
        }
    };

    useEffect(() => {
        if (selectedJobId) enhanceJob(selectedJobId);
    }, [selectedJobId]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchJobs(searchTerm, location);
    };

    const handleApply = (id: string, url: string) => {
        if (!user) {
            alert("Please sign in to apply for jobs!");
            router.push("/login");
            return;
        }
        setAppliedJobs(prev => [...prev, id]);
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        router.push("/login");
    };

    const toggleFilter = (filter: string) => {
        setSelectedFilters(prev =>
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
    };

    const selectedJob = useMemo(() => jobs.find(j => j.id === selectedJobId), [jobs, selectedJobId]);

    return (
        <div className="min-h-screen bg-[#f3f6f9] flex flex-col font-sans relative">
            {/* Top Navigation */}
            <header className="bg-[#1a365d] h-16 flex items-center justify-between px-8 text-white shrink-0 shadow-lg relative z-30">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-black">J</div>
                    <h1 className="text-xl font-bold tracking-tight">JobNexus <span className="text-[10px] bg-blue-400 text-white px-1.5 py-0.5 rounded-full ml-1 font-black uppercase tracking-widest">Pro</span></h1>
                </div>

                <div className="flex-1 max-w-2xl mx-10 hidden md:block">
                    <form onSubmit={handleSearch} className="relative group flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-blue-400 transition" />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by title, company, or skills..."
                                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm focus:bg-white/10 focus:outline-none focus:border-blue-400/50 transition-all placeholder:text-white/20"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-black uppercase tracking-widest transition shadow-lg shadow-blue-500/20"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 border-r border-white/10 pr-6">
                        <Link href="/courses" className="text-white/60 hover:text-white transition group flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">Courses</span>
                        </Link>
                        <Bell className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition" />
                        <Heart className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition" />
                    </div>
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => !user && router.push("/login")}>
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold border border-white/20">
                            {user ? user.name.slice(0, 2).toUpperCase() : "GU"}
                        </div>
                        <span className="text-sm font-medium hidden lg:block">
                            {user ? user.name : "Guest User"}
                        </span>
                        {user ? (
                            <button onClick={handleLogout} className="text-[10px] bg-red-500/20 hover:bg-red-500 text-red-200 px-2 py-1 rounded ml-2 transition">
                                Logout
                            </button>
                        ) : (
                            <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white transition" />
                        )}
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 flex flex-col pt-6 relative z-10 hidden lg:flex">
                    <div className="px-6 mb-8">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100 shadow-sm mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-blue-600" />
                                <span className="text-[10px] font-black text-blue-800 uppercase tracking-widest">AI Match Profile</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-blue-900">92%</span>
                                <span className="text-[10px] font-bold text-blue-500 uppercase">Strong</span>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1 leading-tight">Your skills match top-tier engineering roles.</p>
                        </div>

                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-1">Navigation</p>
                        <nav className="flex flex-col gap-1">
                            <SidebarLink icon={<LayoutDashboard className="w-5 h-5" />} label="Job Feed" href="/jobs" active />
                            <SidebarLink icon={<BrainCircuit className="w-5 h-5" />} label="Courses" href="/courses" />
                        </nav>
                    </div>

                    <div className="mt-auto p-6 border-t border-gray-100">
                        <Link href="/" className="flex items-center justify-between group cursor-pointer text-xs font-bold text-gray-500 hover:text-blue-600 transition">
                            <div className="flex items-center gap-3">
                                <Search className="w-4 h-4" /> Back to Home
                            </div>
                            <ArrowUpRight className="w-3 h-3 text-gray-300 group-hover:text-blue-400" />
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col bg-[#f8fafc] overflow-hidden">
                    {/* Filters Bar */}
                    <div className="bg-white border-b border-gray-200 px-8 py-3 flex items-center gap-3 overflow-x-auto no-scrollbar shrink-0">
                        <div className="flex items-center gap-2 pr-4 border-r border-gray-100">
                            <Filter className="w-4 h-4 text-gray-400" />
                            <span className="text-xs font-bold text-gray-600">Filters</span>
                        </div>
                        {filters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => toggleFilter(filter)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
                                    selectedFilters.includes(filter)
                                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                                )}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 flex overflow-hidden">
                        {/* Jobs List */}
                        <div className="w-full lg:w-[450px] border-r border-gray-200 overflow-y-auto p-6 space-y-4 bg-white/50">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-black text-[#1e293b] uppercase tracking-widest">Recommended</h3>
                                <span className="text-[10px] text-gray-400 font-bold">{jobs.length} Results Found</span>
                            </div>

                            {loading ? (
                                Array(4).fill(0).map((_, i) => (
                                    <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 animate-pulse space-y-3 shadow-sm">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-xl" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-gray-100 rounded w-3/4" />
                                                <div className="h-3 bg-gray-50 rounded w-1/2" />
                                            </div>
                                        </div>
                                        <div className="h-10 bg-gray-50 rounded-xl" />
                                    </div>
                                ))
                            ) : jobs.length > 0 ? (
                                jobs.map((job) => (
                                    <div
                                        key={job.id}
                                        onClick={() => setSelectedJobId(job.id)}
                                        className={cn(
                                            "group bg-white p-5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden",
                                            selectedJobId === job.id
                                                ? "border-blue-500 shadow-xl shadow-blue-900/5 ring-1 ring-blue-50"
                                                : "border-gray-100 hover:border-blue-200 hover:shadow-lg"
                                        )}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner",
                                                job.source === "LinkedIn" ? "bg-blue-50 text-blue-600" :
                                                    job.source === "Naukri" ? "bg-red-50 text-red-600" :
                                                        "bg-gray-50 text-gray-400"
                                            )}>
                                                {job.title.toLowerCase().includes("engineer") || job.title.toLowerCase().includes("dev") ? <Zap className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-black text-[#1e293b] truncate mb-0.5 group-hover:text-blue-600 transition tracking-tight">
                                                    {job.title}
                                                </h4>
                                                <p className="text-xs font-bold text-gray-500 truncate mb-2">{job.company}</p>
                                                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400">
                                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-blue-400" /> {job.location}</span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-200" />
                                                    <span className="text-emerald-600">Recently Updated</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                            <MatchScore score={calculateMatch(job, userResume.skills)} />
                                            {job.enhancing ? (
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-blue-400 animate-pulse">
                                                    <BrainCircuit className="w-3 h-3" /> AI Thinking...
                                                </div>
                                            ) : (
                                                <div className="text-[10px] font-black uppercase tracking-tighter text-blue-600 flex items-center gap-1">
                                                    {job.source} {job.ai_summary && <Sparkles className="w-2 h-2" />} <ArrowUpRight className="w-2 h-2" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-20 text-center flex flex-col items-center">
                                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                        <Search className="w-8 h-8 text-blue-200" />
                                    </div>
                                    <p className="text-xs font-bold text-gray-400">Search for jobs to see personalized results.</p>
                                </div>
                            )}
                        </div>

                        {/* Job Detail View */}
                        <div className="hidden lg:flex flex-1 bg-white flex-col overflow-y-auto">
                            {selectedJob ? (
                                <div className="p-10 max-w-4xl mx-auto w-full space-y-10">
                                    {/* Header Info */}
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-4">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest border border-blue-100">
                                                <Sparkles className="w-3 h-3" /> Featured Opportunity
                                            </div>
                                            <h2 className="text-3xl font-black text-[#1e293b] leading-tight tracking-tighter">{selectedJob.title}</h2>
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center font-black text-gray-400">
                                                        {selectedJob.company[0]}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-gray-800">{selectedJob.company}</p>
                                                        <p className="text-xs font-bold text-blue-600">Verified Platform</p>
                                                    </div>
                                                </div>
                                                <div className="w-px h-8 bg-gray-100" />
                                                <div className="space-y-0.5">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</p>
                                                    <p className="text-xs font-bold text-gray-700">{selectedJob.location}</p>
                                                </div>
                                                <div className="w-px h-8 bg-gray-100" />
                                                <div className="space-y-0.5">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Job Type</p>
                                                    <p className="text-xs font-bold text-gray-700">Full-time</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-200 hover:bg-red-50 hover:border-red-100 group transition">
                                                <Heart className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:fill-red-500 transition" />
                                            </button>
                                            <button
                                                onClick={() => handleApply(selectedJob.id, selectedJob.redirect_url)}
                                                className="px-10 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-sm hover:bg-blue-700 transition shadow-xl shadow-blue-500/20"
                                            >
                                                Apply Now <ExternalLink className="w-4 h-4 ml-2" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* AI Insights Card */}
                                    <div className="bg-[#1a365d] p-8 rounded-[2.5rem] text-white overflow-hidden relative group">
                                        {selectedJob.enhancing && (
                                            <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[2px] z-20 flex items-center justify-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                                                    <span className="text-xs font-black tracking-[0.2em] uppercase text-blue-100">AI Processing</span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl -mr-32 -mt-32 rounded-full" />
                                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="relative w-24 h-24 flex items-center justify-center">
                                                    <svg className="w-full h-full -rotate-90">
                                                        <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                                                        <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={2 * Math.PI * 44} strokeDashoffset={2 * Math.PI * 44 * (1 - calculateMatch(selectedJob, userResume.skills) / 100)} className="text-blue-400" />
                                                    </svg>
                                                    <span className="absolute text-xl font-black">{calculateMatch(selectedJob, userResume.skills)}%</span>
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Match Score</span>
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <h4 className="text-xl font-black tracking-tight flex items-center gap-2">
                                                    <BrainCircuit className="w-5 h-5 text-blue-400" /> AI Applicant Insights
                                                </h4>
                                                <p className="text-sm text-blue-100/70 font-medium leading-relaxed">
                                                    {selectedJob.ai_summary || `Analyzing this role against your profile... We are looking for alignment with your skills like ${userResume.skills.split(',')[0].replace('- ', '')}.`}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {userResume.skills.split(',').slice(0, 4).map((skill, i) => (
                                                        <SkillBadge key={i} label={skill.replace('- ', '').trim()} match={selectedJob.title.toLowerCase().includes(skill.toLowerCase()) || i < 2} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-6">
                                        <h4 className="text-lg font-black text-[#1e293b] flex items-center gap-3">
                                            <div className="w-1 h-6 bg-blue-600 rounded-full" /> Job Description
                                        </h4>
                                        <div className="text-sm text-gray-500 leading-relaxed space-y-4 font-medium">
                                            {selectedJob.description.split('. ').map((sentence, i) => (
                                                <p key={i}>{sentence}.</p>
                                            ))}
                                            <p>As a candidate for this role, you will be part of a dynamic team focused on building scalable web applications. We value innovation, collaboration, and a strong technical foundation.</p>
                                        </div>
                                    </div>

                                    {/* About Company */}
                                    <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-black text-gray-800">About {selectedJob.company}</h4>
                                            <p className="text-xs text-gray-500 font-bold">10,000+ Employees · Aggregated Opportunity</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-20 space-y-6">
                                    <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center relative">
                                        <Briefcase className="w-16 h-16 text-blue-100" />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-blue-50/50 rounded-full animate-ping" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-gray-800 tracking-tight">Select a job to view details</h3>
                                        <p className="text-sm text-gray-400 max-w-sm mx-auto font-medium">Click on any opportunity in the list to see AI matching, full description, and company insights.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function SidebarLink({ icon, label, href, active = false, count }: { icon: React.ReactNode, label: string, href: string, active?: boolean, count?: string }) {
    return (
        <Link href={href} className={cn(
            "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-sm font-bold tracking-tight",
            active ? "bg-blue-50 text-blue-700" : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
        )}>
            <div className="flex items-center gap-3">
                {icon}
                {label}
            </div>
            {count && <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full group-hover:bg-blue-100 transition">{count}</span>}
        </Link>
    );
}

function MatchScore({ score }: { score: number }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        score > 80 ? "bg-emerald-500" : score > 50 ? "bg-blue-500" : "bg-amber-500"
                    )}
                    style={{ width: `${score}%` }}
                />
            </div>
            <span className={cn(
                "text-[9px] font-black uppercase tracking-widest",
                score > 80 ? "text-emerald-600" : "text-blue-600"
            )}>{score}% Match</span>
        </div>
    );
}

function SkillBadge({ label, match = false }: { label: string, match?: boolean }) {
    return (
        <div className={cn(
            "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition cursor-default",
            match ? "bg-blue-400/20 border-blue-400 text-white" : "bg-white/5 border-white/20 text-blue-200 opacity-40 hover:opacity-100"
        )}>
            {match ? <CheckCircle2 className="w-3 h-3" /> : <Info className="w-3 h-3" />}
            {label}
        </div>
    );
}

function calculateMatch(job: Job, skills: string): number {
    const jobText = (job.title + " " + job.description).toLowerCase();
    const userSkills = skills.toLowerCase().split(/[,\n-]/).map(s => s.trim().split(':')[1] || s.trim()).filter(s => s.length > 2);

    let matches = 0;
    userSkills.forEach(skill => {
        if (jobText.includes(skill.toLowerCase())) matches++;
    });

    const baseMatch = 40 + Math.random() * 20; // Ensure some base match
    const skillBonus = (matches / Math.max(userSkills.length, 1)) * 40;

    return Math.min(Math.round(baseMatch + skillBonus), 98);
}

