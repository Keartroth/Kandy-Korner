import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import "./Location.css"

export default (props) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const inventoryList = props.productList  || []
    
    return (
        <>
            <section className="location">
                <h3 className="location__name">{props.location.name}</h3>
                <Button onClick={toggle}>Details</Button>
            </section>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>
                    {props.location.name}
                </ModalHeader>
                <ModalBody>
                    <address className="location__address">{props.location.address}</address>
                    <div className="location__size">
                        <label className="label--location">Square Footage:</label> {props.location.size}
                    </div>
                    <div className="location__amenities">
                        <label className="label--location">Handicap Accessible:</label> {props.location.handicapAccessible ? "✅" : "🚫"}
                    </div>
                    <div>
                        <label className="label--location">Available Product:</label>
                        <ul>
                            {
                                inventoryList.map(il => <li key={il.id}>{il.name}</li>)
                            }
                        </ul>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}