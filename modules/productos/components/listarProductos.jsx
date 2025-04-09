import { useState, useEffect } from "react";
import ProductosService from "../services/productosService";

const ListarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await ProductosService.getProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error fetching productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  });

  return (
    <div className="h-full w-full">
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <table className="grid place-content-center h-full w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4">Nombre</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Estado</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 ? (
              productos.map((producto) => (
                <tr key={producto.id} className="border-b hover:bg-gray-100">
                  <td className="p-4">{producto.nombre}</td>
                  <td className="p-4">{producto.stock}</td>
                  <td className="p-4">${producto.precio}</td>
                  <td className="p-4">{producto.estado}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No hay productos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarProductos;
