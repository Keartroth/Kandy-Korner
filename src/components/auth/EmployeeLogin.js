import React, { useRef } from "react"
import { Button } from 'reactstrap'
import "./Login.css"

export const EmployeeLogin = ({ toggle }) => {
    const email = useRef()
    const password = useRef()

    const existingEmployeeCheck = () => {
        return fetch(`http://localhost:8088/employees?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return user[0]
                }
                return false
            })
    }

    const handleEmployeeLogin = (e) => {
        e.preventDefault()
        existingEmployeeCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value) {
                    if (exists.management === true) {
                        localStorage.setItem("kandy_manager", exists.id)
                        toggle()
                    } else {
                        localStorage.setItem("kandy_employee", exists.id)
                        toggle()
                    }
                } else if (exists && exists.password !== password.current.value) {
                    window.alert("Password does not match.")
                } else if (!exists) {
                    window.alert("Combination of email or password does not exist.")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleEmployeeLogin}>
                    <h1>Kandy Korner Employee Login</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input ref={email} type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset>
                        <Button type="submit">
                            Sign in
                        </Button>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}