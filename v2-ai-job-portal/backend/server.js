const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/**
 * 1. Health Check Endpoint
 * Used by frontend (checkHealth function) to show "AI Online" status
 */
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

/**
 * 2. Jobs Search Endpoint (GET)
 * Used by frontend (fetchJobs function) to search for roles
 */
app.get('/jobs', (req, res) => {
    const query = req.query.q || "Software";
    
    // Mock data matching the fields your frontend template expects
    const mockJobs = [
        { 
            id: 1, 
            title: `${query} Developer`, 
            company: "Tech Global", 
            location: "Remote", 
            ai_summary: "Based on your search for ${query}, this role is a top match. It involves building scalable systems using modern frameworks." 
        },
        { 
            id: 2, 
            title: `Junior ${query} Engineer`, 
            company: "Innovation Hub", 
            location: "Bangalore, India", 
            ai_summary: "A perfect entry-level role for someone interested in ${query}. AI analysis shows high growth potential in this company." 
        },
        { 
            id: 3, 
            title: `Staff ${query} Architect`, 
            company: "Cloud Solutions", 
            location: "San Francisco, CA", 
            ai_summary: "Senior position. AI recommends this based on your advanced skill profile." 
        }
    ];

    res.json({ 
        success: true, 
        data: mockJobs 
    });
});

/**
 * 3. AI Enhancement Endpoint (POST)
 * Your existing mock logic for job description optimization
 */
app.post('/jobs/enhance', (req, res) => {
    const { title, description } = req.body;
    console.log(`Enhancing job: ${title}`);

    const skills = ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'Python', 'AWS'];
    const randomSkills = skills.sort(() => 0.5 - Math.random()).slice(0, 3);

    res.json({
        enhanced_description: `${description}\n\n✨ AI ENHANCEMENTS ✨\n- Targeted Skills: ${randomSkills.join(', ')}\n- ATS Score: ${Math.floor(Math.random() * 21) + 75}%\n- Optimization: High`,
        match_score: Math.floor(Math.random() * 21) + 75,
        suggested_skills: randomSkills
    });
});

/**
 * 4. Authentication / Student Entry Mock (POST)
 * Your existing logic for profile updates
 */
app.post('/auth/student-entry', (req, res) => {
    const studentData = req.body;
    console.log('Received student data:', studentData);
    res.json({ success: true, message: 'Profile updated successfully' });
});

// IMPORTANT: This handles the /api/auth/register path if your frontend calls it
app.post('/api/auth/register', (req, res) => {
    res.json({ success: true, message: 'Registration successful' });
});

/**
 * 5. Server Startup
 * Railway automatically provides the PORT variable
 */
const PORT = 8080; 

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend Server running on port ${PORT}`);
});
