import React, { useState, useContext, useRef } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import "./Employee.css"
import { EmployeeContext } from "./EmployeesProvider"
import { LocationContext } from "../locations/LocationsProvider"

export default (props) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [modalEditForm, setEditFormModal] = useState(false)
    const toggleEditForm = () => setEditFormModal(!modalEditForm)
    const { updateEmployee } = useContext(EmployeeContext)
    const { locations } = useContext(LocationContext)
    const subject = props.employee
    const firstName = subject.name.split(" ")[0]
    const employeeName = useRef("")
    const employeeLocation = useRef(0)
    const employeeAddress = useRef("")
    const employeePayRate = useRef("")
    const employeeEmail = useRef("")
    const employeePassword = useRef("")
    const employeePasswordConfirmation = useRef("")
    const employeeFullTime = useRef(0)
    const employeeManagement = useRef(0)
    const currentEmployee = parseInt(localStorage.getItem("kandy_employee"))
    const currentManager = parseInt(localStorage.getItem("kandy_manager"))

    const employementStatus = (e) => {
        e.preventDefault()
        const toggleReHireForm = props.toggleReHireForm
        subject.employmentStatus = !subject.employmentStatus
        updateEmployee(subject).then(toggleReHireForm)
    }
    const editEmployee = () => {
        if (employeePassword.current.value !== employeePasswordConfirmation.current.value) {
            window.alert("Passwords do not match.")
        } else {
            const isManager = (employeeManagement.current.value === "true" ? true : false)
            const isFullTime = (employeeFullTime.current.value === "true" ? true : false)
            const locationId = parseInt(employeeLocation.current.value)
            const payRateInt = parseInt(employeePayRate.current.value)

            let employeeObect = {
                id: subject.id,
                name: employeeName.current.value,
                management: isManager,
                fullTime: isFullTime,
                payRate: payRateInt,
                locationId: locationId,
                address: employeeAddress.current.value,
                email: employeeEmail.current.value,
                password: employeePassword.current.value,
                employmentStatus: true
            }
            updateEmployee(employeeObect).then(toggleEditForm)
        }
    }

    return (
        <>
            <div className="employee">
                <h3 className="employee__name">{subject.name}</h3>
                {localStorage.getItem("kandy_manager") || parseInt(localStorage.getItem("kandy_employee")) === subject.id ? <Button onClick={toggle}>Details</Button> : ""}
            </div>

            <Modal className="employee__card" isOpen={modal} toggle={toggle}>
                <ModalHeader>
                    {subject.name}
                </ModalHeader>
                <ModalBody>
                    <div className="employee__management">
                        <label className="label--employee">Management:</label> {subject.management ? "✅" : "❌"}
                    </div>
                    <div className="employee__type">
                        <label className="label--employee">Full Time:</label> {subject.fullTime ? "✅" : "❌"}
                    </div>
                    {localStorage.getItem("kandy_manager") && subject.management === false ? <div className="employee__pay"><label className="label--employee">Hourly Pay Rate:</label> ${subject.payRate}.00</div> : ""}
                    {subject.id === currentManager ? <div className="employee__pay"><label className="label--employee">Hourly Pay Rate:</label> ${subject.payRate}.00</div> : ""}
                    {subject.id === currentEmployee ? <div className="employee__pay"><label className="label--employee">Hourly Pay Rate:</label> ${subject.payRate}.00</div> : ""}
                    <div className="employee__location">
                        <label className="label--employee">Location:</label> {props.workplace.name}
                    </div>
                    <div className="employee__homeAddress">
                        <label className="label--employee">Home Address:</label> {subject.address}
                    </div>
                </ModalBody>
                <ModalFooter>
                    {localStorage.getItem("kandy_manager") && subject.management === false && subject.employmentStatus === true ? <Button color="secondary" onClick={toggleEditForm}>Edit {firstName}'s Info</Button> : ""}
                    {localStorage.getItem("kandy_manager") && subject.management === false && subject.employmentStatus === true ? <Button color="secondary" onClick={employementStatus}>Terminate</Button> : ""}
                    {localStorage.getItem("kandy_manager") && subject.employmentStatus === false  && parseInt(localStorage.getItem("kandy_manager")) !== subject.id ? <Button color="secondary" onClick={employementStatus}>Re-hire</Button> : ""}
                    {subject.id === currentEmployee && subject.employmentStatus === true ? <Button color="secondary" onClick={employementStatus}>I Quit!</Button> : ""}
                    {subject.id === currentManager && subject.employmentStatus === true ? <Button color="secondary" onClick={employementStatus}>I Quit!</Button> : ""}
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditForm} toggle={toggleEditForm}>
                <form>
                    <ModalHeader>
                        <div className="employeeForm__title">{subject.name}</div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="employeeName">Employee name: </label>
                            <input
                                type="text"
                                id="employeeName"
                                ref={employeeName}
                                required
                                autoFocus
                                className="form-control"
                                defaultValue={subject.name}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="employeeAddress">Address: </label>
                            <input
                                type="text"
                                id="employeeAddress"
                                ref={employeeAddress}
                                required
                                className="form-control"
                                defaultValue={subject.address}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="employeeEmail">Email: </label>
                            <input
                                type="text"
                                id="employeeEmail"
                                ref={employeeEmail}
                                required
                                className="form-control"
                                defaultValue={subject.email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="employeePassword">Password: </label>
                            <input
                                type="password"
                                id="employeePassword"
                                ref={employeePassword}
                                required
                                className="form-control"
                                defaultValue={subject.password}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="employeePasswordConfirmation">PasswordConfirmation: </label>
                            <input
                                type="password"
                                id="employeePasswordConfirmation"
                                ref={employeePasswordConfirmation}
                                required
                                className="form-control"
                                defaultValue={subject.password}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="employeeLocation">Work location: </label>
                            <select
                                ref={employeeLocation}
                                id="employeeLocation"
                                className="form-control"
                                defaultValue={subject.locationId}
                            >
                                <option value="0">Select a location</option>
                                {locations.map(l => (
                                    <option key={l.id} value={l.id}>
                                        {l.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fullTime">Full Time status: </label>
                            <select
                                ref={employeeFullTime}
                                id="fullTime"
                                className="form-control"
                                defaultValue={subject.fullTime ? "true" : "false"}
                            >
                                <option value="0">Select Work Status</option>
                                <option value="true">Full-Time</option>
                                <option value="false">Part Time</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="management">Management Status: </label>
                            <select
                                ref={employeeManagement}
                                id="management"
                                className="form-control"
                                defaultValue={subject.management ? "true" : "false"}
                            >
                                <option value="0">Select Management Status</option>
                                <option value="true">Management</option>
                                <option value="false">Non-management</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="employeePayRate">Pay Rate: </label>
                            <input
                                type="number"
                                id="employeePayRate"
                                ref={employeePayRate}
                                required
                                className="form-control"
                                defaultValue={subject.payRate}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit"
                            onClick={
                                evt => {
                                    evt.preventDefault() // Prevent browser from submitting the form
                                    editEmployee()
                                }
                            }
                            className="btn btn-primary">
                            Update Employee
                        </Button>
                        <Button color="secondary" onClick={toggleEditForm}>Close</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    )
}