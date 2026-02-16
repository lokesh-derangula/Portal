// CHANGE THIS to your actual Railway URL
const API_BASE_URL = 'https://job-portal-2026.up.railway.app/'; 

// ... rest of your frontend code remains the same

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const jobsContainer = document.getElementById('jobs-container');
const resultsCount = document.getElementById('results-count');
const mainLoader = document.getElementById('main-loader');
const aiStatusBadge = document.getElementById('ai-status');
const jobDetailView = document.getElementById('job-detail-view');

let currentJobs = [];
let selectedJobId = null;

// Check backend health and AI status
async function checkHealth() {
    try {
        const res = await fetch(`${API_BASE_URL}/health`);
        const data = await res.json();
        if (data.status === 'ok') {
            aiStatusBadge.classList.add('online');
        }
    } catch (err) {
        aiStatusBadge.classList.remove('online');
    }
}

// Fetch jobs from backend
async function fetchJobs() {
    const query = searchInput.value.trim();
    if (!query) return;

    // UI States
    mainLoader.style.display = 'block';
    searchButton.disabled = true;

    // Clear existing jobs (keep header)
    const existingCards = jobsContainer.querySelectorAll('.job-card');
    existingCards.forEach(card => card.remove());

    resultsCount.textContent = 'Analyzing opportunities...';
    jobDetailView.innerHTML = `
        <div class="empty-detail">
            <div class="spinner"></div>
            <h3>Searching...</h3>
        </div>
    `;

    try {
        const response = await fetch(`${API_BASE_URL}/jobs?q=${encodeURIComponent(query)}`);
        const result = await response.json();

        if (result.success) {
            currentJobs = result.data;
            renderJobList(currentJobs);
            resultsCount.textContent = `${result.data.length} Recommended Roles`;

            // Auto-select first job
            if (currentJobs.length > 0) {
                selectJob(currentJobs[0]);
            } else {
                showEmptyState();
            }
        } else {
            showError(result.message || 'Error fetching jobs');
        }
    } catch (error) {
        showError('Backend Connection failed. Please ensure the server is running.');
    } finally {
        mainLoader.style.display = 'none';
        searchButton.disabled = false;
    }
}

// Render the list of jobs in the left pane
function renderJobList(jobs) {
    const template = document.getElementById('job-card-template');

    jobs.forEach(job => {
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector('.job-card');

        card.querySelector('.job-item-title').textContent = job.title;
        card.querySelector('.job-item-company').textContent = job.company;
        card.querySelector('.loc-text').textContent = job.location;
        card.querySelector('.company-logo').textContent = job.company.charAt(0);

        // Match score (randomized for aesthetic, similar to original)
        const score = Math.floor(80 + Math.random() * 18);
        card.querySelector('.match-fill').style.width = `${score}%`;
        card.querySelector('.match-text').textContent = `${score}% AI Match`;

        card.addEventListener('click', () => {
            // Remove active class from all
            document.querySelectorAll('.job-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectJob(job);
        });

        jobsContainer.appendChild(clone);
    });

    lucide.createIcons();
}

// Select and display job details in the right pane
function selectJob(job) {
    const template = document.getElementById('job-detail-template');
    const clone = template.content.cloneNode(true);

    clone.querySelector('h2').textContent = job.title;
    clone.querySelector('.det-company').textContent = job.company;
    clone.querySelector('.det-location').textContent = job.location;
    clone.querySelector('.ai-summary-text').textContent = job.ai_summary;

    // Process description into paragraphs
    const descContainer = clone.querySelector('.description-text');
    const paragraphs = job.ai_summary.includes('(')
        ? ["As a candidate for this role, you will be part of a dynamic team focused on building scalable applications. We value innovation, collaboration, and a strong technical foundation.", "We are looking for someone who can drive impact and bring new ideas to the table."]
        : ["This role involves working with cross-functional teams to deliver high-quality software solutions.", "You will be responsible for designing and implementing key features, ensuring performance and scalability."];

    paragraphs.forEach(p => {
        const pEl = document.createElement('p');
        pEl.textContent = p;
        descContainer.appendChild(pEl);
    });

    jobDetailView.innerHTML = '';
    jobDetailView.appendChild(clone);
    lucide.createIcons();
}

function showEmptyState() {
    jobDetailView.innerHTML = `
        <div class="empty-detail">
            <i data-lucide="search-x" class="empty-icon"></i>
            <h3>No jobs found</h3>
            <p>Try searching for a different job title or location.</p>
        </div>
    `;
    resultsCount.textContent = '0 Roles Found';
    lucide.createIcons();
}

function showError(message) {
    jobDetailView.innerHTML = `
        <div class="empty-detail">
            <i data-lucide="alert-circle" class="empty-icon" style="color: #ef4444; opacity: 1;"></i>
            <h3>Connection Error</h3>
            <p>${message}</p>
        </div>
    `;
    lucide.createIcons();
}

// Event Listeners
searchButton.addEventListener('click', fetchJobs);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchJobs();
});

// Init
checkHealth();
setInterval(checkHealth, 5000);
