import React from 'react'
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";



export default function Home() {
    return (
        <div>
            <div className="max-w-7xl mx-auto pt-20 px-6">
                <HeroSection />
                <FeatureSection />
                <Experience />
                <Testimonials />
            </div>
        </div>
    )
}


