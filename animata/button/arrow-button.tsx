'use client'
import { MoveRight } from 'lucide-react'
import { cn } from '@/lib/utils';
import React from 'react'
interface ArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    textColor?: string;
    buttonColor?: string;
    buttonOverlayColor?: string;
    borderColor?: string;
    iconColor?: string;
    className?:string
}
export default function ArrowButton({ text, textColor, buttonColor, buttonOverlayColor, borderColor, iconColor, className, ...props }: ArrowButtonProps) {
    return (
        <button style={{background:buttonColor,borderColor:borderColor}}  {...props} className={cn("relative inline-flex items-center justify-center p -3 px-6 py-3 overflow-hidden font-medium duration-300 transition  ease-out border-2 border-purple-400  rounded-full shadow-md group ",className)}>
            <span style={{background:buttonOverlayColor}} className={cn("absolute inset-0 duration-300 flex items-center justify-center w-full h-full text-white -translate-x-full  group-hover:translate-x-0 ease bg-purple-400")}>
                <MoveRight style={{color:iconColor}} />
            </span>
            <span style={{color:textColor}} className={cn("absolute flex items-center duration-300 justify-center w-full h-full  transition-all  transform group-hover:translate-x-full ease ")}>{text}</span>
            <span className="relative invisible">Button</span>
        </button>
    )
}
