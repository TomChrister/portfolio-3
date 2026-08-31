import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import { Analytics } from '@vercel/analytics/react';
import {SpeedInsights} from "@vercel/speed-insights/react";

export default function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

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
