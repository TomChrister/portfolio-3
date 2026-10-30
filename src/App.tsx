import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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

    // React Router neither scrolls to #hash targets nor resets scroll between pages.
    const { pathname, hash, key } = useLocation();
    useEffect(() => {
        if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
        else window.scrollTo(0, 0);
    }, [pathname, hash, key]);

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
