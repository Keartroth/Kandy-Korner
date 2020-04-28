import React, { useRef, useState } from "react"
import { Button } from 'reactstrap'
import Register from "./Register"
import "./Login.css"

export const Login = ({ toggle }) => {
    const [registerCheck, registerUpdate] = useState(false)
    const toggleRegister = () => registerUpdate(!registerCheck)

    const email = useRef()
    const password = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/customers?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return user[0]
                }
                return false
            })
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value) {
                    localStorage.setItem("kandy_customer", exists.id)
                    toggle()
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
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Kandy Korner Customer Login</h1>
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
            <section className="link--register">
                <div className="fakeLink href" onClick={toggleRegister}>Not a member yet?</div>
                <div>
                    <Register toggleRegister={toggleRegister} toggle={toggle} registerCheck={registerCheck} />
                </div>
            </section>
        </main>
    )
}