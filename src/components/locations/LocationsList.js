import React, { useContext } from "react"
import { LocationContext } from "./LocationsProvider"
import { LocationProductsContext } from "./LocationProductsProvider"
import { ProductContext } from "../products/ProductsProvider"
import Location from "./Location"
import "./Location.css"

export default () => {
    const { locations } = useContext(LocationContext)
    const { products } = useContext(ProductContext)
    const { locationProducts } = useContext(LocationProductsContext)

    return (
        <article className="locations">
            <h1>Locations</h1>
            <section className="locationList">
                {
                    locations.map(loc => {
                        let locationsProductArray = locationProducts.filter(lp => lp.locationId === loc.id)
                        let foundProducts = locationsProductArray.map(flp => {
                            return products.find(p => p.id === flp.productId)
                        })
                        return <Location key={loc.id}
                            location={loc}
                            productList={foundProducts} />
                    })
                }
            </section>
        </article>
    )
}