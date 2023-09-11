import express, { Request, Response } from "express";
import { authorizedOnly } from "@/middlewares";
import { environment } from "@/config";

const router = express.Router();

router.get('/jobs', authorizedOnly, getJobs);

// This route handler fetches all the recent node js 
// developer jobs in india using indeed api
async function getJobs(req: Request, res: Response) {

    const params = new URLSearchParams({
        query: 'node js developer',
        location: 'india',
        page_id: '1',
        locality: 'in',
        fromage: '3',
        radius: '50'
    });


    const url = `https://indeed12.p.rapidapi.com/jobs/search?${params}`;

    const headers = {
        'X-RapidAPI-Key': environment.rapidApiKey,
        'X-RapidAPI-Host': environment.rapidApiHost
    };


    const response = await fetch(url, { method: 'GET', headers });

    const data = await response.json();

    return res.render('job/index', { data });

}

export { router };