import React, { useContext } from "react"
import { ProductTypesContext } from "./ProductTypesProvider"
import { ProductContext } from "./ProductsProvider"
import Product from "./Product"
import "./Product.css"

export default props => {
    const { products } = useContext(ProductContext)
    const { productTypes } = useContext(ProductTypesContext)

    return (
        <article className="products">
            <h1>Products</h1>
            <section className="productsList">
                {
                    products.map(pro => {
                        let foundProductType = productTypes.find(typ => typ.id === pro.productTypesId)

                        return <Product key={pro.id}
                            product={pro}
                            productType={foundProductType}
                            {...props} />
                    })
                }
            </section>
        </article>
    )
}