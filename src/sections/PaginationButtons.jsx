import {useState} from 'react'
import ButtonPagination from '../components/ButtonPagination'

const PaginationButtons = () => {
    const [active, setActive] = useState(1)
    return (
        <div className="flex justify-center my-8 gap-2">
            <ButtonPagination>Anterior</ButtonPagination>
            <ButtonPagination active={active === 1} onClick={() => setActive(1)}>1</ButtonPagination>
            <ButtonPagination active={active === 2} onClick={() => setActive(2)}>2</ButtonPagination>
            <ButtonPagination active={active === 3} onClick={() => setActive(3)}>3</ButtonPagination>
            <ButtonPagination>Siguiente</ButtonPagination>
        </div>
    )
}

export default PaginationButtons
