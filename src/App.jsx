import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ProductList from "./components/ProductList";
import StatsPanel from "./components/StatsPanel";
import Stats from "./components/Stats";
import SearchBar from "./components/SearchBar";
import BarChartCategory from "./components/BarChartCategory";
import StockPieChart from "./components/StockPieChart";
import StockRating from "./components/StockRating";
import PriceLineChart from "./components/PriceLineChart";
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
    const [format, setFormat] = useState("");

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [sortField, setSortField] = useState(""); 
    const [sortOrder, setSortOrder] = useState("asc");  
    
    useEffect(() => {
        axios.get("https://dummyjson.com/products/categories")
            .then(res => setCategories(res.data));
    }, []);

    useEffect(() => {
        axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${(page -1) * limit}`).then((res) => {            
            setProducts(res.data.products);
        });
    }, [page]);

    // Filtrar productos de la API
    let filteredProducts = products
        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
        .filter(p => !selectedCategory || p.category === selectedCategory);
    if (sortField) {
        filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
        return a[sortField] - b[sortField];
    } else {
         return b[sortField] - a[sortField];
    }
    });
    }
    const barChartData = [];
    const categoryCount = {};
    filteredProducts.forEach(p => {
        categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });
    for (const [cat, count] of Object.entries(categoryCount)) {
        barChartData.push({ category: cat, cantidad: count });
    }
    const stockPieData = [
        { name: "Stock ≥ 50", value: filteredProducts.filter(p => p.stock >= 50).length },
        { name: "Stock < 50", value: filteredProducts.filter(p => p.stock < 50).length }
    ];
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
            const lineChartData = filteredProducts.map((p, idx) => ({
                    nombre: p.title,
                    precio: p.price,
                    index: idx + 1
                    }));
    return (
        <div ref={containerRef}>
            <h1 className="text-red-600">
                Productos</h1>
            <button className= 'boton-personalizado' onClick={toggleDark}>activar modo {dark ? 'claro': 'oscuro'}</button>
            <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="boton-personalizado"
            >
                <option value="">Todas las categorías</option>
                {categories.map(cat =>
                    typeof cat === "string" ? (
                        <option key={cat} value={cat}>{cat}</option>
                    ) : (
                        <option key={cat.slug || cat.name} value={cat.slug || cat.name}>
                            {cat.name || cat.slug}
                        </option>
                    )
                )}
            </select>
            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />      
            <select onChange={(e)=> setFormat(e.target.value)} value={format} className="boton-personalizado">
                <option>Seleccionar formato</option>
                <option value="json">JSON</option>
                <option value="PDF">PDF</option>
                <option value="Excel">EXCEL</option>
            </select>
            <button className="px-4 py2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow transition"onClick={handleExport}>Exportar archivo</button>

            <div style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
                <select
                    value={sortField}
                    onChange={e => setSortField(e.target.value)}
                    className="boton-personalizado"
                >
                    <option value="">Ordenar por...</option>
                    <option value="price">Precio</option>
                    <option value="rating">Rating</option>
                </select>
                <select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value)}
                    className="boton-personalizado"
                >
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                </div>
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
            <h3 className="mt-6 mb-2 font-bold">Cantidad de productos por categoría</h3>
                <BarChartCategory data={barChartData} />
            <h3 className="mt-6 mb-2 font-bold">Proporción de productos según stock</h3>
                <StockPieChart data={stockPieData} />      
            <StockRating products={filteredProducts} />
            <h3 className="mt-6 mb-2 font-bold">Evolución de precios (simulada)</h3>
            <PriceLineChart data={lineChartData} />
        </div>
    );
}
export default App;
