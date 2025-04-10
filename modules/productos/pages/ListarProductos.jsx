import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductosService from "../services/ProductosService.js";

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
  }, []);

  const eliminarProducto = async (id) => {
    const confirmDelete = window.confirm("¿Estas seguro de eliminar el producto?");
    if (!confirmDelete) return;
    try {
      await ProductosService.deleteProducto(id);
      setProductos((prevProductos) =>
        prevProductos.filter((producto) => producto.id !== id)
      );
      alert("Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Lista de Productos
        </h1>

        <div className="flex justify-end mb-4">
          <Link
            to="/crearProducto"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            + Añadir producto
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Cargando productos...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700 text-sm uppercase">
                  <th className="px-6 py-3">Nombre</th>
                  <th className="px-6 py-3">Precio</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.length > 0 ? (
                  productos.map((producto) => (
                    <tr
                      key={producto.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">{producto.nombre}</td>
                      <td className="px-6 py-4">S/ {producto.precio}</td>
                      <td className="px-6 py-4">{producto.stock}</td>
                      <td className="px-6 py-4">{producto.estado}</td>
                      <td className="px-6 py-4 space-x-2">
                        <Link
                          to={`/editarProducto/${producto.id}`}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => eliminarProducto(producto.id)}
                          className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-gray-500 py-6"
                    >
                      No hay productos disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListarProductos;
