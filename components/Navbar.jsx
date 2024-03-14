"use client";

import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import Link from "next/link";
import clsx from "clsx";
import MaxWidthWrapper from './MaxWidthWrapper';
import { Switch } from "@/components/ui/switch"
import { Button } from './ui/button';

const Navbar = ({ main_page }) => {

    const [lightMode, setLightMode] = useState(typeof window !== "undefined" ? (window.localStorage.getItem("themeMode") === "light" ? true : false) : false);
    const [word, setWord] = useState("");
    const [fontType, setFontType] = useState(typeof window !== "undefined" ? (localStorage.getItem("fonttheme") || "serif") : "serif");

    useEffect(() => {
        localStorage.setItem("fonttheme", fontType);
    }, [fontType]);

    useEffect(() => {
        if (lightMode) {
            localStorage.setItem("themeMode", "light");
        } else {
            localStorage.setItem("themeMode", "dark");
        }

        const selectedTheme = localStorage.getItem("themeMode");
        const html = document.getElementsByTagName("html")[0];

        html.classList.remove("light");
        html.classList.remove("dark");

        if (selectedTheme) {
            html.classList.add(selectedTheme);
        } else if (window.matchMedia("(prefers-color-scheme: dark")) {
            html.classList.add("dark");
        } else {
            html.classList.add("light");
        }
    }, [lightMode]);

    function handleTheme() {
        setLightMode(prev => !prev);
    }

  return (
    <MaxWidthWrapper>
        <nav className={clsx(`w-full flex flex-col font-${fontType}`, {
            "min-h-max md:min-h-96 items-center pt-52 pb-10 bg-primary-foreground px-10 md:px-20 rounded-bl-xl rounded-br-xl": main_page === true,
            "mt-14": main_page === false,
        })}>
            <div className="flex flex-col flex-wrap items-center w-full gap-7 md:gap-0 md:flex-row md:justify-between">

                <Link href="/" className="flex gap-5 items-center">
                    <div className={clsx("flex flex-col", {
                        "flex": main_page === true,
                        "hidden": main_page === false
                    })}>

                        <h1 className="text-4xl font-bold">Word Vault</h1>
                        <span className="mt-1 font-semibold">Dictionary</span>
                    </div>

                    <FontAwesomeIcon icon={faBook} className="text-4xl text-gray-500"/>
                </Link>
                
                <div className="flex justify-center items-center flex-wrap">
                    <div className="border-r-[1px] border-r-gray-300 flex pr-5">
                        <select defaultValue={fontType} onChange={(option) => setFontType(option.target.value)} className={clsx("bg-primary-foreground w-max text-purple-500", {
                            "bg-card": main_page === false
                        })}>
                            <option value="serif" className="font-serif">Serif</option>
                            <option value="sans" className="font-sans">Sans Serif</option>
                            <option value="mono" className="font-mono">Monospace</option>
                        </select>
                    </div>

                    <Switch checked={lightMode} onClick={() => handleTheme()} className="ml-5"/>

                    {lightMode === true ? (
                        <FontAwesomeIcon icon={faMoon} className="text-2xl ml-5 cursor-pointer text-gray-500"/>
                    )
                    : (
                        <FontAwesomeIcon icon={faSun} className="text-2xl ml-5 cursor-pointer text-gray-500"/>
                    )}
                </div>
            </div>

            <form className="mt-10 h-14 w-full bg-secondary flex items-center rounded-xl">
                <input type="text" value={word} onChange={(e) => setWord(e.target.value)} className="w-full focus:outline-none bg-secondary px-5 py-3 h-full rounded-tl-xl rounded-bl-xl" placeholder="Search words..." required/>
                
                <div className="bg-secondary pr-2 h-14 flex justify-center items-center rounded-br-xl rounded-tr-xl">
                    {word.trim() !== "" ? (
                        <Link href={`/search/${word}`}>
                            <Button>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-purple-500 cursor-pointer"/>
                            </Button>
                        </Link>
                    ) : (
                        <Button className="bg-primary-foreground rounded-lg hover:bg-primary-foreground">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-purple-500 cursor-pointer"/>
                        </Button>
                    )}
                    
                </div>
            </form>
        </nav>
    </MaxWidthWrapper>
  )
}

export default Navbar;