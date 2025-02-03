import { motion } from "framer-motion";
import { useState } from "react";

interface props {
    id: string;
    name: string;
    placeholder: string;
    type: string;
}

export function CustomInputComponent({ id, name, placeholder, type }: props) {
    const [elementFocused, setElementFocused] = useState<HTMLInputElement | null>(null);

    return (
        <div className="relative w-full max-w-sm">
            <input
                className="text-black dark:text-white px-2 py-1 bg-transparent outline-none rounded-sm w-full"
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                onFocus={(e) => setElementFocused(e.currentTarget)}
                onBlur={() => setElementFocused(null)}
            />
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-blue-600"
                initial={{ width: "0%" }}
                animate={{ width: elementFocused?.id === name ? "100%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </div>
    );
}