function ProductList({ products }) {
    
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((p) => (
                <li key={p.id} className="p-2 bg-gray-100 rounded shadow border">
                    <span className="font-semibold">{p.title}</span>
                    <span className="text-green-700"> ${p.price}</span>
                </li>
            ))}
        </ul>
    );
}

export default ProductList;