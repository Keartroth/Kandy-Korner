import React, { useState, useEffect } from "react"
import { Login } from "./Login"
import { EmployeeLogin } from "./EmployeeLogin"

export const Auth = ({ toggle }) => {
    const [activeList, setActiveList] = useState("customer")
    const [components, setComponents] = useState()

    const [EmployeeCheck, employeeUpdate] = useState(false)
    const toggleEmployee = () => employeeUpdate(!EmployeeCheck)

    // HIGHER ORDER FUNCTION. IT RETURNS OTHER FUNCTION (i.e. COMPONENTS)
    const showLogin = () => (
        <Login toggle={toggle} />
    )

    const showEmployeeLogin = () => (
        <EmployeeLogin toggle={toggle} toggleEmployee={toggleEmployee} />
    )

    /*
        This effect hook determines which list is shown
        based on the state of the `activeList` variable.
    */
    useEffect(() => {
        if (activeList === "customer") {
            setComponents(showLogin)
        }
        else if (activeList === "admin") {
            setComponents(showEmployeeLogin)
        }
    }, [activeList])

    return (
        <div className="mainContainer">
            <div className="listDisplay">
                {components}
            </div>
            <div className="authContainer">
                {activeList === "admin" ? <div className="fakeLink href" onClick={() => setActiveList("customer")}>Customer Login</div> : ""}
                {activeList === "customer" ? <div className="fakeLink href" onClick={() => setActiveList("admin")}>Employee Login</div> : ""}
            </div>
        </div>
    )
}