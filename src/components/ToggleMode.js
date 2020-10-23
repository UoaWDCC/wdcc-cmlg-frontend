import React from "react";
import Toggle from "react-toggle";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const ToggleMode = () => {

    const [isDark, setIsDark] = useState(true);
    return (
        <Toggle
            className="DarkToggle"
            checked={isDark}
            icons={{ checked: "🌙", unchecked: "🔆" }}
            aria-label="Dark mode"
        />
    );
};

export default () =>{
    <ToggleMode/>
}