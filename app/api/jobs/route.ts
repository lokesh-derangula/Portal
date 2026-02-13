import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const what = searchParams.get('what') || 'Software Engineer';
    const where = searchParams.get('where') || 'India';
    const country = 'in'; // Default to India for Adzuna API

    const APP_ID = process.env.ADZUNA_APP_ID;
    const API_KEY = process.env.ADZUNA_API_KEY;

    if (!APP_ID || !API_KEY) {
        console.error('Adzuna credentials are not set in environment variables');
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    try {
        const adzunaUrl = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${APP_ID}&app_key=${API_KEY}&results_per_page=15&what=${encodeURIComponent(what)}&where=${encodeURIComponent(where)}&content-type=application/json`;

        const response = await fetch(adzunaUrl);

        if (!response.ok) {
            throw new Error(`Adzuna API responded with status: ${response.status}`);
        }

        const data = await response.json();

        if (data.results) {
            return NextResponse.json({
                results: data.results.map((job: any) => ({
                    id: job.id,
                    title: job.title.replace(/<\/?[^>]+(>|$)/g, ""), // Remove HTML tags
                    company: job.company.display_name,
                    location: job.location.display_name,
                    description: job.description.replace(/<\/?[^>]+(>|$)/g, ""), // Remove HTML tags
                    created: job.created,
                    redirect_url: job.redirect_url,
                    source: "Adzuna"
                }))
            });
        } else {
            return NextResponse.json({ results: [] });
        }
    } catch (error: any) {
        console.error('Error fetching jobs from Adzuna:', error);
        return NextResponse.json({ error: "Failed to fetch jobs from provider" }, { status: 500 });
    }
}
