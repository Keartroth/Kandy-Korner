import React, { useState, useContext } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { CustomerContext } from "../customers/CustomerProvider"
import "./User.css"
import { CustomerProductsContext } from "../customers/CustomerProductsProvider"
import { ProductContext } from "../products/ProductsProvider"
import UserOrderHistory from "./UserOrderHistory"

export default (props) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const { customers } = useContext(CustomerContext)
    const { products } = useContext(ProductContext)
    const { customerProducts } = useContext(CustomerProductsContext)
    const customerId = parseInt(localStorage.getItem("kandy_customer"))
    const customerInformation = customers.find(c => c.id === customerId)
    const purchaseHistory = customerProducts.filter(cp => cp.customerId === customerId)

    return (
        <>
            <section className="customer">
                <h3 className="customer__name">{customerInformation.name}</h3>
                <div className="customer__contact">
                    <label className="label--customer">Customer Contact:</label> {customerInformation.email}
                </div>
                <div className="customer__shippingAddress">
                    <label className="label--customer">Shipping Address:</label> {customerInformation.address}
                </div>
                <Button onClick={toggle}>Order History</Button>
            </section>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader id="orderHistory__header">
                    {customerInformation.name}'s Order History
                </ModalHeader>
                <ModalBody>
                    <ul>
                        {
                            purchaseHistory.map(ph => {
                                let purchasedProduct = products.find(p => p.id === ph.productId)
                                return <UserOrderHistory
                                key={purchaseHistory.indexOf(ph)}
                                product={purchasedProduct}
                                {...props} />
                            })
                        }
                    </ul>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}