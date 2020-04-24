import React, { useContext, useState, useRef } from "react"
import "../customers/Customer.css"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { CartContext } from "./CartProductProvider"

export default (props) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const { shoppingCart, removeItemFromCart, addItemToCart } = useContext(CartContext)
    const productQuantityNode = useRef(0)
    const customerId = parseInt(localStorage.getItem("kandy_customer"))
    const product = props.product
    const totalPrice = product.quanitiy * product.price

    const removeItem = () => {
        const currentCustomersCart = shoppingCart.filter(sc => sc.customerId === customerId)
        const foundProducts = currentCustomersCart.filter(cc => cc.productId === product.id)
        foundProducts.forEach(fp => removeItemFromCart(fp.id))
    }

    const editCartQuantity = () => {
        const productQuantity = productQuantityNode.current.value
        if (productQuantity > product.quanitiy) {
            const numberToAdd = productQuantity - product.quanitiy
            const productId = props.product.id
            const customerId = parseInt(localStorage.getItem("kandy_customer"))

            for (var i = 0; i < numberToAdd; i++) {
                let productObject = {
                    productId: productId,
                    customerId: customerId
                }
                addItemToCart(productObject)
            }
            toggle()
        } else if (productQuantity < product.quanitiy) {
            const numberToRemove = product.quanitiy - productQuantity
            const currentCustomersCart = shoppingCart.filter(sc => sc.customerId === customerId)
            const foundProducts = currentCustomersCart.filter(cc => cc.productId === product.id)

            for (var i = 1; i <= numberToRemove; i++) {
                removeItemFromCart(foundProducts[i].id)
            }
            toggle()
        } else {
            toggle()
            alert("Warning: updated quantity is identical to original quantity. Please ensure you are ordering the desired amount.")
        }
    }

    return (
        <>
            <tr>
                <td>{product.name}</td>
                <td>{product.quanitiy}</td>
                <td>{product.price}</td>
                <td>{totalPrice.toFixed(2)}</td>
                <td><Button color="secondary" onClick={toggle}>Edit Quantity</Button><Button onClick={removeItem}>Remove Items From Cart</Button></td>
            </tr>

            <Modal className="cart__edit" isOpen={modal} toggle={toggle}>
                <ModalHeader>
                    {product.name}
                </ModalHeader>
                <ModalBody>
                    <div className="cart__edit-quantity">
                        <label htmlFor="cart__edit-quantityInput">Quantity to Purchase: </label>
                        <input
                            type="number"
                            id="cart__edit-quantityInput"
                            ref={productQuantityNode}
                            required
                            autoFocus
                            className="cart__edit-quantity"
                            defaultValue={product.quanitiy}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={editCartQuantity}>Update Quantity</Button>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}