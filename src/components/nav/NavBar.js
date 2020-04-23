import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export default (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Locations</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/products">Online Ordering</Link>
            </li>
            {
                sessionStorage.getItem("customer_cart")
                    ? <li className="navbar__item">
                        <Link className="navbar__link"
                            to="/cart"
                        >Cart</Link>
                    </li>
                    : ""
            }
            <li className="navbar__item active">
                <Link className="navbar__link" to="/customer">Users's Account</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li>
            {
                localStorage.getItem("kandy_customer")
                    ? <li className="navbar__item">
                        <Link className="navbar__link"
                            to=""
                            onClick={e => {
                                e.preventDefault()
                                localStorage.removeItem("kandy_customer")
                                sessionStorage.removeItem("customer_cart")
                                props.history.push("/")
                            }}
                        >Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}