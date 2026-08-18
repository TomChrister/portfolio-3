import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import { Analytics } from '@vercel/analytics/react';
import {SpeedInsights} from "@vercel/speed-insights/react";

export default function App() {
    return (
        <div className="min-h-screen text-ink">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/projects/:slug" element={<ProjectDetail/>}/>
            </Routes>
            <Analytics/>
            <SpeedInsights/>
        </div>
    );
}
