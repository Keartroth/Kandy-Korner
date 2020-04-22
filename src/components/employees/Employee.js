import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import "./Employee.css"

export default (props) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    
    return (
        <>
            <div className="employee">
                <h3 className="employee__name">{props.employee.name}</h3>
                <Button onClick={toggle}>Details</Button>
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>
                    {props.employee.name}
                </ModalHeader>
                <ModalBody>
                    <div className="employee__management">
                        <label className="label--employee">Management:</label> {props.employee.management ? "✅" : "❌"}
                    </div>
                    <div className="employee__type">
                        <label className="label--employee">Full Time:</label> {props.employee.fullTime ? "✅" : "❌"}
                    </div>
                    <div className="employee__pay">
                        <label className="label--employee">Hourly Pay Rate:</label> ${props.employee.payRate}.00
                    </div>
                    <div className="employee__location">
                        <label className="label--employee">Location:</label> {props.workplace.name}
                    </div>
                    <div className="employee__homeAddress">
                        <label className="label--employee">Home Address:</label> {props.employee.address}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}