import {useState} from 'react'
import ButtonRegion from '../components/ButtonRegion'

const RegionSelector = () => {
    const [estado, setEstado] = useState("Kanto");
    return (
        <div className="flex flex-wrap justify-center gap-[0.5rem] my-6">
            <ButtonRegion estado={estado === "Kanto" } onclick={() => setEstado("Kanto")}>Kanto (1-151)</ButtonRegion>
            <ButtonRegion estado={estado === "Johto" } onclick={() => setEstado("Johto")}>Johto (152-251)</ButtonRegion>
            <ButtonRegion estado={estado === "Hoenn" } onclick={() => setEstado("Hoenn")}>Hoenn (252-386)</ButtonRegion>
            <ButtonRegion estado={estado === "Sinnoh" } onclick={() => setEstado("Sinnoh")}>Sinnoh (387-493)</ButtonRegion>
            <ButtonRegion estado={estado === "Unova" } onclick={() => setEstado("Unova")}>Unova (494-649)</ButtonRegion>
            <ButtonRegion estado={estado === "Kalos" } onclick={() => setEstado("Kalos")}>Kalos (650-721)</ButtonRegion>
            <ButtonRegion estado={estado === "Alola" } onclick={() => setEstado("Alola")}>Alola (722-809)</ButtonRegion>
            <ButtonRegion estado={estado === "Galar" } onclick={() => setEstado("Galar")}>Galar (810-898)</ButtonRegion>
            <ButtonRegion estado={estado === "Paldea" } onclick={() => setEstado("Paldea")}>Paldea (899-1025)</ButtonRegion>
        </div>
    )
}

export default RegionSelector
