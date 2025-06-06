import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";
import Stats from "./components/Stats";
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

    return (
        <div ref={containerRef}>
            <h1 className="titulo-personalizado">¡Hola!</h1>

            <button className= 'boton-personalizado' onClick={toggleDark}>activar modo {dark ? 'claro': 'oscuro'}</button>

            <input
                type="text"
                placeholder="Buscar producto"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 mb-4"
            />

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
