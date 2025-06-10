function ProductItem({ title, price }) {
  return (
    <div className="p-2 bg-gray-100 rounded shadow border flex flex-col items-start">
      <span className="font-semibold">{title}</span>
      <span className="text-green-600">${price}</span>
    </div>
  );
}
export default ProductItem;