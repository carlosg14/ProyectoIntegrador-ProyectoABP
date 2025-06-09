import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";
import Stats from "./components/Stats";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(true);
    const containerRef = useRef(null);
    const [dark, setdark] = useState(false);
    const toggleDark = () => {
        setdark(!dark);
        containerRef.current.classList.toggle('dark-mode');
    };
    const [page, setPage]= useState (1);
    const limit = 10;

    useEffect(() => {
        axios.get('https://dummyjson.com/products?limit=${limit}&skip=${(page -1) * limit}`).then((res) => {
            setProducts(res.data.products);
        });
    }, [page]);

    const filteredProducts = products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    const totalProducts = filteredProducts.length;
    const maxProduct =
        filteredProducts.length > 0
            ? Math.max(...filteredProducts.map((p) => p.price))
            : 0;
    const minProduct =
        filteredProducts.length > 0
            ? Math.min(...filteredProducts.map((p) => p.price))
            : 0;
    const mostExpensive = filteredProducts.find((p) => p.price === maxProduct);
    const cheapest = filteredProducts.find((p) => p.price === minProduct);
    const longTitleCount = filteredProducts.filter((p) => p.title.length > 20).length;
    const totalPrice = filteredProducts.reduce((sum, p) => sum + p.price, 0);
    const avgDiscount =
        filteredProducts.length > 0
            ? (
                filteredProducts.reduce((sum, p) => sum + p.discountPercentage, 0) /
                filteredProducts.length
            ).toFixed(2)
            : 0;

    const handleExport = () => {
                const blob = new Blob([JSON.stringify(filteredProducts, null, 2)], {
                    type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                triggerDownload(url, `productos.${format}`);
    }

    const triggerDownload = (url, filename) => {
                // crear el hipervinculo
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                // Agregamos el anchor tag al DOM
                document.body.appendChild(link);
                // Simulamos el click
                link.click();
                // Eliminar el elemento del anchor
                document.body.removeChild(link);
    }



    return (
        <div ref={containerRef}>
            <h1 className="titulo-personalizado">¡Hola!</h1>

            <button className= 'boton-personalizado' onClick={toggleDark}>activar modo {dark ? 'claro': 'oscuro'}</button>

            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

            <select onChange={(e)=> setFormat(e.target.value)} value={format} className="boton-personalizado">
                <option>Seleccionar formato</option>
                <option value="json">JSON</option>
                <option value="PDF">PDF</option>
                <option value="Excel">EXCEL</option>
            </select>
            
            <button className="boton-paginación"onClick={handleExport}>Exportar archivo</button>

            <ProductList products={filteredProducts} />
            
            <small> Estamos en la pagina {page}</small>
            <br/>

            <button disabled={page === 1}
            className="boton-paginación"
            onClick={()=>{
                setPage(page - 1);
            }}
            > 
            Página anterior</button>


            <button disabled={products.length<limit} 
            className="boton-paginación" 
            onClick={()=>{
                setPage(page + 1);
            }}
            >
             Página siguiente</button>

            
            <button
                className="boton-personalizado"
                onClick={() => setShow(!show)}
            >
                {show ? "Ocultar estadísticas" : "Mostrar estadísticas"}
            </button>
            
            
            
            {show && (
                <StatsPanel
                    total={totalProducts}
                    maximo={maxProduct}
                    minimo={minProduct}
                    mostExpensive={mostExpensive}
                    cheapest={cheapest}
                    longTitleCount={longTitleCount}
                    totalPrice={totalPrice}
                    avgDiscount={avgDiscount}
                />
            )}
            {filteredProducts.length == 0 && <div>No se encontraron productos</div>}
            
            {show && (
                <Stats
                    total={totalProducts}
                    max={maxProduct}
                    min={minProduct}
                />
            )}
            
        </div>
    );
}

export default App;
