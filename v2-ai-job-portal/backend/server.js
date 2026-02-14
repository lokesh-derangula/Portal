const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock AI Enhancement endpoint
app.post('/jobs/enhance', (req, res) => {
    const { title, description } = req.body;
    console.log(`Enhancing job: ${title}`);

    // Simple enhancement logic (mocking AI)
    const skills = ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS'];
    const randomSkills = skills.sort(() => 0.5 - Math.random()).slice(0, 3);

    res.json({
        enhanced_description: `${description}\n\n✨ AI ENHANCEMENTS ✨\n- Targeted Skills: ${randomSkills.join(', ')}\n- ATS Score: ${Math.floor(Math.random() * 21) + 75}%\n- Optimization: High`,
        match_score: Math.floor(Math.random() * 21) + 75,
        suggested_skills: randomSkills
    });
});

// Authentication Mock for Student Detail Entry
app.post('/auth/student-entry', (req, res) => {
    const studentData = req.body;
    console.log('Received student data:', studentData);
    res.json({ success: true, message: 'Profile updated successfully' });
});

const AI_PORT = 8080;
app.listen(AI_PORT, '0.0.0.0', () => {
    console.log(`AI Backend Server running on port ${AI_PORT}`);
});
