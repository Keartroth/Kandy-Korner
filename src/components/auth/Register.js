import React, { useRef, useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import "./Login.css"

const Register = ({ toggleRegister, registerCheck, toggle }) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const address = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/customers?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return true
                }
                return false
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            existingUserCheck()
                .then(() => {
                    fetch("http://localhost:8088/customers", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: `${firstName.current.value} ${lastName.current.value}`,
                            address: address.current.value,
                            email: email.current.value,
                            password: password.current.value
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("kandy_customer", createdUser.id)
                                toggleRegister()
                                toggle()
                            }
                        })
                })
        } else {
            window.alert("Passwords do not match")
        }
    }

    return (
        <Modal isOpen={registerCheck} toggle={toggleRegister}>
            <main style={{ textAlign: "center" }}>
                <form className="form--login" onSubmit={handleRegister}>
                    <ModalHeader>
                        <h1 className="h3 mb-3 font-weight-normal">Please Register for Kandy Korner</h1>
                    </ModalHeader>
                    <ModalBody>
                        <fieldset>
                            <label htmlFor="firstName"> First Name </label>
                            <input ref={firstName} type="text"
                                name="firstName"
                                className="form-control"
                                placeholder="First name"
                                required autoFocus />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="lastName"> Last Name </label>
                            <input ref={lastName} type="text"
                                name="lastName"
                                className="form-control"
                                placeholder="Last name"
                                required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputEmail"> Email address </label>
                            <input ref={email} type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email address"
                                required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputAddress"> Address </label>
                            <input ref={address} type="text"
                                name="address"
                                className="form-control"
                                placeholder="Address"
                                required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputPassword"> Password </label>
                            <input ref={password} type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="verifyPassword"> Verify Password </label>
                            <input ref={verifyPassword} type="password"
                                name="verifyPassword"
                                className="form-control"
                                placeholder="Verify password"
                                required />
                        </fieldset>
                    </ModalBody>
                    <ModalFooter>
                        <fieldset>
                            <Button type="submit">
                                Sign in
                    </Button>
                        </fieldset>
                    </ModalFooter>
                </form>
            </main>
        </Modal>
    )
}

export default Register