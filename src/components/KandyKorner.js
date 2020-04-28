import React, { useState } from "react"
import Dashboard from "./Dashboard"
import "./KandyKorner.css"
import { Auth } from "./auth/Auth"


export default () => {
    const [check, update] = useState(false)
    const toggle = () => update(!check)

    return (
        localStorage.getItem("kandy_customer") || 
        localStorage.getItem("kandy_manager") || 
        localStorage.getItem("kandy_employee") ? <Dashboard toggle={toggle} /> : <Auth toggle={toggle} />
)}