import React, { useContext, useState, useRef } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import "./Product.css"
import { CartContext } from "../cart/CartProductProvider"

export default (props) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const { addItemToCart } = useContext(CartContext)
    const productQuantity = useRef(0)

    const addToCart = (e) => {
        e.preventDefault()
        const productId = props.product.id
        const customerId = parseInt(localStorage.getItem("kandy_customer"))
        const purchaseQuantity = parseInt(productQuantity.current.value)

        for (var i = 1; i <= purchaseQuantity; i++) {
            let productObject = {
                productId: productId,
                customerId: customerId
            }
            addItemToCart(productObject)
        }
            toggle()
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
                    <div className="product__quantity">
                        <label htmlFor="productQuantity">Purchase Quantity: </label>
                        <input
                            type="number"
                            id="productQuantity"
                            ref={productQuantity}
                            autoFocus
                            className="product__quantity"
                            defaultValue={1}
                        />
                    </div>
                    <Button color="secondary" onClick={addToCart}>Add to Cart</Button>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}