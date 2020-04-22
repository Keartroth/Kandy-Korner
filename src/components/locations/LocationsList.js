import React, { useContext } from "react"
import { LocationContext } from "./LocationsProvider"
import Location from "./Location"
import "./Location.css"

export default () => {
    const { locations } = useContext(LocationContext)

    return (
        <article className="locations">
            <h1>Locations</h1>
            <section className="locationList">
                {
                    locations.map(loc => {

                        return <Location key={loc.id}
                            location={loc} />
                    })
                }
            </section>
        </article>
    )
}