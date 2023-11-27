import React, { useEffect, useState } from "react";
import TopNav from "../components/main-layout/TopNav";
import FooterView from "../components/main-layout/FooterView";
import SideNav from "../components/main-layout/SideNav";
import { Outlet, useNavigate } from "react-router-dom";

function MainLayout() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    })
    // const [showSideNav, setShowSideNav] = useState(false);

    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    useEffect(() => {
        // Update the state when the isOpen prop changes
        setIsSideNavOpen(isSideNavOpen);
    }, [isSideNavOpen]);

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };


    return (
        <div className="">
            <div>
                <div className="fixed top-0 w-full z-50">
                    <TopNav
                        isOpen={isSideNavOpen}
                        toggleSideNav={toggleSideNav}

                    />
                </div>
                {/* Main Content */}
                <main className=" h-full px-4 md:px-10">
                    <Outlet />
                </main>
                {/* Footer */}
                <FooterView className="" />
            </div>
            {/* Side Nav slides out */}
            <div>
                <SideNav isOpen={isSideNavOpen} toggleSideNav={toggleSideNav} />
            </div>
        </div>
    )
};

export default MainLayout;