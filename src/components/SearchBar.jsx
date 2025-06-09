function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar producto"
      value={value}
      onChange={onChange}
      className="boton-buscarproductos"
    />
  );
}
export default SearchBar;