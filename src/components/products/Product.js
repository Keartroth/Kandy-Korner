import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import "./Product.css"

export default (props) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const addToCart = (e) => {
        const productId = props.product.id
        const productString = productId.toString()
        const cart = sessionStorage.getItem("customer_cart")

        if (cart === null || cart === "") {
            sessionStorage.setItem("customer_cart", productId)
            toggle()
        } else {
            const updateCart = cart + "," + productString
            sessionStorage.setItem("customer_cart", updateCart)
            toggle()
        }
    }

    return (
        <>
            <div className="product">
                <h3 className="product__name">{props.product.name}</h3>
                <Button onClick={toggle}>Details</Button>
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>
                    {props.product.name}
                </ModalHeader>
                <ModalBody>
                    <div className="product__price">
                        <label className="label--product">Price:</label> {props.product.price}
                    </div>
                    <div className="product__type">
                        <label className="label--product">Product Type:</label> {props.productType.type}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={addToCart}>Add to Cart</Button>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}