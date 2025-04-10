import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductosService from "../services/ProductosService.js";
import BackBtn from "../components/BackBtn";

const EditarProducto = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const producto = await ProductosService.getProducto(id);
        setData(producto);
      } catch (error) {
        console.error("Error fetching producto:", error);
        setError("Error al obtener el producto");
      }
    };
    fetchProducto();
  }, [id]);

  if (response) {
    setTimeout(() => {
      navigate("/");
    }, 500);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "precio" || name === "stock" ? parseFloat(value) : value;

    setData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));

    setEditedData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const editarProducto = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await ProductosService.updateProducto(id, editedData);
      setResponse("Producto editado exitosamente, redirigiendo ...");
    } catch (error) {
      console.error("Error editando producto:", error);
      setError("Error al editar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <BackBtn />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Editar Producto
        </h2>

        {loading && (
          <p className="text-blue-600 mb-4 text-center">Cargando...</p>
        )}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {response && (
          <p className="text-green-500 mb-4 text-center">{response}</p>
        )}

        <form onSubmit={editarProducto} className="space-y-5">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={data.nombre || ""}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="precio"
              className="block text-sm font-medium text-gray-700"
            >
              Precio
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={data.precio || ""}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={data.stock || ""}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="estado"
              className="block text-sm font-medium text-gray-700"
            >
              Estado
            </label>
            <input
              type="text"
              id="estado"
              name="estado"
              value={data.estado || ""}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarProducto;
