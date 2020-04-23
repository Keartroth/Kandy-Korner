import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export default (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Locations</Link>
            </li>
            {
                localStorage.getItem("kandy_customer")
                    ? <li className="navbar__item">
                        <Link className="navbar__link"
                            to="/products"
                        >Online Ordering</Link>
                    </li>
                    : ""
            }
            {
                localStorage.getItem("kandy_customer")
                    ? <li className="navbar__item">
                        <Link className="navbar__link"
                            to="/cart"
                        >Cart</Link>
                    </li>
                    : ""
            }
            {
                localStorage.getItem("kandy_customer")
                    ? <li className="navbar__item">
                        <Link className="navbar__link"
                            to="/user"
                        >Users's Account</Link>
                    </li>
                    : ""
            }
            {
                localStorage.getItem("kandy_employee") || localStorage.getItem("kandy_manager")
                    ? <li className="navbar__item">
                        <Link className="navbar__link"
                            to="/employees"
                        >Employees</Link>
                    </li>
                    : ""
            }
            {
                localStorage.getItem("kandy_employee") || localStorage.getItem("kandy_manager")
                    ? <li className="navbar__item">
                        <Link className="navbar__link"
                            to="/customers"
                        >Customers</Link>
                    </li>
                    : ""
            }
            {
                localStorage.getItem("kandy_employee") || localStorage.getItem("kandy_manager") || localStorage.getItem("kandy_customer")
                    ? <li className="navbar__item">
                        <Link className="navbar__link"
                            to=""
                            onClick={e => {
                                e.preventDefault()
                                localStorage.removeItem("kandy_employee")
                                localStorage.removeItem("kandy_manager")
                                localStorage.removeItem("kandy_customer")
                                props.history.push("/")
                            }}
                        >Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}