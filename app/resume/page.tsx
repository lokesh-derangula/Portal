"use client";
import React, { useState } from "react";
import Link from "next/link";
import { initialResumeData } from "@/lib/resume-data";

export default function ResumePage() {
    const [data, setData] = useState(initialResumeData);

    // Persist data to localStorage
    React.useEffect(() => {
        const saved = localStorage.getItem("user_resume");
        if (saved) setData(JSON.parse(saved));
    }, []);

    const updateData = (newData: any) => {
        setData(newData);
        localStorage.setItem("user_resume", JSON.stringify(newData));
    };

    const [showLatex, setShowLatex] = useState(false);

    const generateLatex = () => {
        return `
\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontawesome5}
\\usepackage{multicol}
\\setlength{\\multicolsep}{-3.0pt}
\\setlength{\\columnsep}{-1pt}
\\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}


\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.6in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.19in}
\\addtolength{\\topmargin}{-.7in}
\\addtolength{\\textheight}{1.4in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\classesList}[4]{
    \\item\\small{
        {#1 #2 #3 #4 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & \\textbf{\\small #2} \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & \\textbf{\\small #2}\\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\circ$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

%----------HEADER----------
% \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
%   \\textbf{\\href{http://sourabhbajaj.com/}{\\Large Sourabh Bajaj}} & Email : \\href{mailto:sourabh@sourabhbajaj.com}{sourabh@sourabhbajaj.com}\\\\
%   \\href{http://sourabhbajaj.com/}{http://www.sourabhbajaj.com} & Mobile : +1-123-456-7890 \\\\
% \\end{tabular*}

\\begin{center}
    {\\Huge \\scshape ${data.name}} \\\\ \\vspace{1pt}
    ${data.phone} $\\mid$ \\href{mailto:${data.email}}{${data.email}} 
    \\small \\href{${data.linkedin}}{\\underline{LinkedIn}} $|$
    \\href{${data.github}}{\\underline{GitHub}} $|$
    \\href{${data.portfolio}}{\\underline{Portfolio}}
\\end{center}


%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {ABC Institute}{India}
      {B.Tech CSE, CGPA 8.5}{2022 -- 2026}
    \\resumeSubheading
      {XYZ College}{India}
      {Diploma CS, CGPA 8.2}{2019 -- 2022}
  \\resumeSubHeadingListEnd


%-----------EXPERIENCE-----------
\\section{Internship}
  \\resumeSubHeadingListStart

    \\resumeSubheading
      {Backend Developer Intern}{Jun 2024 -- Aug 2024}
      {XYZ Tech}{Remote}
      \\resumeItemListStart
        \\resumeItem{Built REST APIs}
        \\resumeItem{Improved API performance}
      \\resumeItemListEnd

  \\resumeSubHeadingListEnd


%-----------PROJECTS-----------
\\section{Projects}
    \\resumeSubHeadingListStart
      \\resumeProjectHeading
          {\\textbf{Smart Task Manager} $|$ \\emph{React, Spring Boot, MySQL}}{Jan 2025 -- Mar 2025}
          \\resumeItemListStart
            \\resumeItem{Built a full-stack task management system}
            \\resumeItem{Implemented JWT authentication}
            \\resumeItem{Optimized database queries}
          \\resumeItemListEnd
    \\resumeSubHeadingListEnd


%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: Java, JavaScript} \\\\
     \\textbf{Frontend}{: React, HTML, CSS, Tailwind} \\\\
     \\textbf{Backend}{: Spring Boot, REST APIs} \\\\
     \\textbf{Database}{: MySQL} \\\\
     \\textbf{Core Concepts}{: OOPS, DBMS, CN}
    }}
 \\end{itemize}
 
 %-----------ACHIEVEMENTS-----------
\\section{Achievements}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\resumeItem{Solved 400+ LeetCode problems}
     \\resumeItem{Participated in Hackathon 2024}
    }}
 \\end{itemize}


%-------------------------------------------
\\end{document}
        `.trim();
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <Link href="/jobs" className="text-gray-400 hover:text-white">&larr; Back to Jobs</Link>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Resume Builder</h1>
                </div>

                <div className="space-y-4 h-[80vh] overflow-y-auto pr-4">
                    <label className="block text-sm font-medium text-gray-400">Full Name</label>
                    <input
                        value={data.name}
                        onChange={(e) => updateData({ ...data, name: e.target.value })}
                        className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400">Email</label>
                            <input
                                value={data.email}
                                onChange={(e) => updateData({ ...data, email: e.target.value })}
                                className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400">Phone</label>
                            <input
                                value={data.phone}
                                onChange={(e) => updateData({ ...data, phone: e.target.value })}
                                className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                            />
                        </div>
                    </div>

                    <label className="block text-sm font-medium text-gray-400">Social Links (LinkedIn, GitHub, Portfolio)</label>
                    <div className="space-y-2">
                        <input value={data.linkedin} onChange={(e) => updateData({ ...data, linkedin: e.target.value })} placeholder="LinkedIn URL" className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white" />
                        <input value={data.github} onChange={(e) => updateData({ ...data, github: e.target.value })} placeholder="GitHub URL" className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white" />
                        <input value={data.portfolio} onChange={(e) => updateData({ ...data, portfolio: e.target.value })} placeholder="Portfolio URL" className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white" />
                    </div>

                    <label className="block text-sm font-medium text-gray-400">Technical Skills</label>
                    <textarea
                        rows={5}
                        value={data.skills}
                        onChange={(e) => updateData({ ...data, skills: e.target.value })}
                        className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono text-xs"
                    />

                    <label className="block text-sm font-medium text-gray-400">Projects (LaTeX formatting recommended)</label>
                    <textarea
                        rows={6}
                        value={data.projects}
                        onChange={(e) => updateData({ ...data, projects: e.target.value })}
                        className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono text-xs"
                    />

                    <label className="block text-sm font-medium text-gray-400">Internship / Experience</label>
                    <textarea
                        rows={4}
                        value={data.experience}
                        onChange={(e) => updateData({ ...data, experience: e.target.value })}
                        className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono text-xs"
                    />

                    <label className="block text-sm font-medium text-gray-400">Education</label>
                    <textarea
                        rows={4}
                        value={data.education}
                        onChange={(e) => updateData({ ...data, education: e.target.value })}
                        className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono text-xs"
                    />

                    <label className="block text-sm font-medium text-gray-400">Achievements</label>
                    <textarea
                        rows={4}
                        value={data.achievements}
                        onChange={(e) => updateData({ ...data, achievements: e.target.value })}
                        className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono text-xs"
                    />
                </div>
            </div>

            <div className="bg-white text-black p-8 rounded-lg shadow-2xl h-fit sticky top-8 max-h-[90vh] overflow-y-auto" id="resume-preview">
                <h2 className="text-4xl font-bold border-b-2 border-black pb-2 mb-4">{data.name}</h2>
                <div className="flex flex-wrap gap-4 text-sm mb-6">
                    <span>{data.email}</span>
                    <span>{data.phone}</span>
                    <a href={data.linkedin} className="text-blue-600 underline">LinkedIn</a>
                    <a href={data.github} className="text-blue-600 underline">GitHub</a>
                </div>

                <div className="mb-6">
                    <h3 className="font-bold text-lg uppercase tracking-wide border-b mb-2">Technical Skills</h3>
                    <pre className="text-gray-700 whitespace-pre-wrap font-sans">{data.skills}</pre>
                </div>

                <div className="mb-6">
                    <h3 className="font-bold text-lg uppercase tracking-wide border-b mb-2">Projects</h3>
                    <pre className="text-gray-700 whitespace-pre-wrap font-sans">{data.projects}</pre>
                </div>

                <div className="mb-6">
                    <h3 className="font-bold text-lg uppercase tracking-wide border-b mb-2">Experience</h3>
                    <pre className="text-gray-700 whitespace-pre-wrap font-sans">{data.experience}</pre>
                </div>

                <div className="mb-6">
                    <h3 className="font-bold text-lg uppercase tracking-wide border-b mb-2">Education</h3>
                    <pre className="text-gray-700 whitespace-pre-wrap font-sans">{data.education}</pre>
                </div>

                <div className="flex gap-4 mt-8 print:hidden">
                    <button
                        onClick={() => window.print()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Download PDF
                    </button>
                    <button
                        onClick={() => setShowLatex(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Export to Overleaf (LaTeX)
                    </button>
                </div>
            </div>

            {showLatex && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-900 border border-white/20 p-6 rounded-xl max-w-4xl w-full max-h-[85vh] flex flex-col">
                        <h3 className="text-xl font-bold mb-4 text-white">Overleaf / LaTeX Code</h3>
                        <p className="text-sm text-neutral-400 mb-4">Copy this code and paste it into a new Overleaf project (main.tex) to get a professional resume.</p>
                        <textarea readOnly className="bg-black p-4 rounded text-xs text-green-400 flex-1 font-mono resize-none focus:outline-none" value={generateLatex()} />
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={() => setShowLatex(false)}
                                className="px-4 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-white"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => navigator.clipboard.writeText(generateLatex()).then(() => alert("Copied to clipboard!"))}
                                className="px-4 py-2 rounded bg-white text-black font-bold hover:bg-neutral-200"
                            >
                                Copy Code
                            </button>
                            <a
                                href="https://www.overleaf.com/project"
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700"
                            >
                                Go to Overleaf
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
