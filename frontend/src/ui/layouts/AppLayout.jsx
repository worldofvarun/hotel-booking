import React from "react";
import { Outlet, useLocation } from "react-router";
import Header from "../Header.jsx";
import Hero from "../Hero.jsx";
import Footer from "../Footer.jsx";
import SearchBar from "../SearchBar.jsx";

function AppLayout() {
    const location = useLocation();


    const shouldHideSearchBar = () => {
        const hiddenPaths = ["/hotel", "/auth", "/me"];
        return hiddenPaths.some((path) => location.pathname.startsWith(path));
    };


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
             <Hero />
            {!shouldHideSearchBar() && <SearchBar />}
            <div className="lg:container mx-auto py-10 flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default AppLayout;
