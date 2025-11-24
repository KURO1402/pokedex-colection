import { useState } from 'react'
import ButtonFilter from '../components/ButtonFilter'

const FilterOptions = () => {
    const [active, setActive] = useState("Todos");
    return (
        <div className="flex justify-center gap-[1rem]">
            <ButtonFilter active={active} onClick={() => setActive("Todos")}>Todos</ButtonFilter>
            <ButtonFilter active={active} onClick={() => setActive("Capturados")}>Capturados</ButtonFilter>
            <ButtonFilter active={active} onClick={() => setActive("Por capturar")}>Por capturar</ButtonFilter>
        </div>
    )
}

export default FilterOptions;