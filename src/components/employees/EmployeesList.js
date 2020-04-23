import React, { useContext, useState, useRef } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { LocationContext } from "../locations/LocationsProvider"
import { EmployeeContext } from "./EmployeesProvider"
import Employee from "./Employee"
import "./Employee.css"

export default props => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [modalHireForm, setHireFormModal] = useState(false)
    const toggleReHireForm = () => setHireFormModal(!modalHireForm)
    const { employees, addEmployee } = useContext(EmployeeContext)
    const { locations } = useContext(LocationContext)
    const employeeName = useRef("")
    const employeeLocation = useRef(0)
    const employeeAddress = useRef("")
    const employeePayRate = useRef("")
    const employeeFullTime = useRef(0)
    const employeeManagement = useRef(0)
    const currentEmployees = employees.filter(e => e.employmentStatus === true)
    const previousEmployees = employees.filter(e => e.employmentStatus === false)

    const constructNewEmployee = () => {
        const locationId = parseInt(employeeLocation.current.value)
        const payRateInt = parseInt(employeePayRate.current.value)

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            const isManager = (employeeManagement.current.value === "true" ? true : false)
            const isFullTime = (employeeFullTime.current.value === "true" ? true : false)

            addEmployee({
                name: employeeName.current.value,
                management: isManager,
                fullTime: isFullTime,
                payRate: payRateInt,
                locationId: locationId,
                address: employeeAddress.current.value,
                employmentStatus: true
            })
                .then(toggle)
        }
    }

    return (
        <>
            <article className="employees">
                <h1>Employees</h1>
                <Button className="employeeList__button" onClick={toggle}>
                    Add Employee
                </Button>
                {previousEmployees.length ? <Button className="employeeList__button" onClick={toggleReHireForm}>Show Former Employees</Button> : ""}
                <section className="employeesList">
                    {
                        currentEmployees.map(emp => {
                            let foundLocation = locations.find(l => l.id === emp.locationId)

                            return <Employee key={emp.id}
                                employee={emp}
                                workplace={foundLocation}
                                {...props} />
                        })
                    }
                </section>
            </article>

            <Modal isOpen={modal} toggle={toggle}>
                <form>
                    <ModalHeader>
                        <div className="employeeForm__title">New Employee</div>
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
                                placeholder="Employee name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="employeeAddress">Address: </label>
                            <input
                                type="text"
                                id="employeeAddress"
                                ref={employeeAddress}
                                required
                                autoFocus
                                className="form-control"
                                placeholder="Employee address"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="employeeLocation">Work location: </label>
                            <select
                                ref={employeeLocation}
                                id="employeeLocation"
                                className="form-control"
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
                                autoFocus
                                className="form-control"
                                placeholder="1500"
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit"
                            onClick={
                                evt => {
                                    evt.preventDefault() // Prevent browser from submitting the form
                                    constructNewEmployee()
                                }
                            }
                            className="btn btn-primary">
                            Save Employee
                    </Button>
                        <Button color="secondary" onClick={toggle}>Close</Button>
                    </ModalFooter>
                </form>
            </Modal>

            <Modal isOpen={modalHireForm} toggle={toggleReHireForm}>
                <form>
                    <ModalHeader>
                        <div className="employeeForm__title">Previous Employees</div>
                    </ModalHeader>
                    <ModalBody>
                        <section className="employeesList">
                            {
                                previousEmployees.map(emp => {
                                    let foundLocation = locations.find(l => l.id === emp.locationId)

                                    return <Employee key={emp.id}
                                        employee={emp}
                                        workplace={foundLocation}
                                        toggleReHireForm={toggleReHireForm}
                                        {...props} />
                                })
                            }
                        </section>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleReHireForm}>Close</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    )
}