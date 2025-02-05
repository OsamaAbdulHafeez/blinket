"use client"

import React, { useEffect, useState } from "react"

export const useMobile = (breakPoint = 768) =>{
    const [isMobile,setIsMobile] = useState(false)

    const handleResize = () =>{
        const checkPoint = window.innerWidth < breakPoint
        setIsMobile(checkPoint)
    }

    useEffect(()=>{
        if (typeof window === "undefined") return;
        handleResize()

        window.addEventListener('resize',handleResize)

        return()=>{
            window.removeEventListener('resize',handleResize)
        }
    },[breakPoint])

    return [ isMobile]
}