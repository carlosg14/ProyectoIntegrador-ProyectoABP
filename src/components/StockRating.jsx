function StockRating ({ products }) {
  const stock50 = products.filter(p => p.stock >= 50).length;
  const stockMenor50 = products.filter(p => p.stock < 50).length;
  const rating45 = products.filter(p => p.rating >= 4.5).length;
  const ratingMenor45 = products.filter(p => p.rating < 4.5).length;

  return (
    <div className="mt-6 mb-2">
      <h3 className="font-bold">Resumen de stock y rating</h3>
      <ul>
        <li>Productos con stock ≥ 50: <b>{stock50}</b></li>
        <li>Productos con stock &lt; 50: <b>{stockMenor50}</b></li>
        <li>Productos con rating ≥ 4.5: <b>{rating45}</b></li>
        <li>Productos con rating &lt; 4.5: <b>{ratingMenor45}</b></li>
      </ul>
    </div>
  );
}

export default StockRating;