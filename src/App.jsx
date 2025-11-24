import Header from './sections/Header';
import StatsSection from './sections/StatsSection';
import FilterOptions from './sections/FilterOptions';
import RegionSelector from './sections/RegionSelector';
import PokedexGrid from './sections/PokedexGrid';
import PaginationButtons from './sections/PaginationButtons';

function App() {
  return (
    <div className="min-h-screen font-[var(--app-font)] bg-[var(--background-color)] text-[var(--text-color)]">
      <Header />
      <div className="max-w-[1200px] mx-auto p-[1rem]">
        <div className="flex justify-between my-4 p-[1rem] bg-white rounded-xl shadow-[var(--shadow)] flex-wrap">
          <StatsSection numeroPokemones={151} pokemonCapturados={0} porcentaje={0}>Progreso regional</StatsSection>
          <StatsSection numeroPokemones={1025} pokemonCapturados={0} porcentaje={0}>Progreso Global</StatsSection>
        </div>
        <FilterOptions />
        <RegionSelector />
        <PokedexGrid />
        <PaginationButtons />
      </div>
    </div>
  )
};

export default App;
