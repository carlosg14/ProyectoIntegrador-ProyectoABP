function StatsPanel({
    total,
    maximo,
    minimo,
    mostExpensive,
    cheapest,
    longTitleCount,
    totalPrice,
    avgDiscount,
}) {
    return (
        <div className="mt-6 p-4 bg-blue rounded shadow transition duration-300 ease-in-out hover:bg-blue-200">
            <h2 className="text-xl font-bold mb-2">Estadísticas</h2>
            <p>Productos totales: {total}</p>
            <p>
                Precio máximo: <span className="text-green-700">${maximo}</span>
                {mostExpensive && <> ({mostExpensive.title})</>}
            </p>
            <p>
                Precio mínimo: <span className="text-red-700">${minimo}</span>
                {cheapest && <> ({cheapest.title})</>}
            </p>
            <p>
                Productos con título &gt; 20 caracteres: <span className="font-semibold">{longTitleCount}</span>
            </p>
            <p>
                Precio total: <span className="font-semibold">${totalPrice}</span>
            </p>
            <p>
                Promedio de descuento: <span className="font-semibold">{avgDiscount}%</span>
            </p>
        </div>
    );
}

export default StatsPanel;