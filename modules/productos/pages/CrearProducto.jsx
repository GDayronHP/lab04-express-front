import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductosService from "../services/productosService";
import BackBtn from "../components/BackBtn";

const CrearProducto = () => {
  const [data, setData] = useState({
    nombre: "",
    precio: 0,
    stock: 0,
    estado: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  if (response) {
    setTimeout(() => {
      navigate("/");
    }, 500);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: name === "precio" || name === "stock" ? parseFloat(value) : value,
    }));
  };

  const crearNuevoProducto = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await ProductosService.createProducto(data);
      setResponse("✅ Producto creado exitosamente, redirigiendo...");
    } catch (error) {
      console.error("Error creando producto:", error);
      setError("❌ Error creando producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <BackBtn />
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Crear nuevo producto
        </h2>

        {loading && <p className="text-blue-500 mb-4 text-center">Cargando...</p>}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {response && <p className="text-green-600 mb-4 text-center">{response}</p>}

        <form onSubmit={crearNuevoProducto} className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="nombre"
              name="nombre"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              onChange={handleChange}
              type="number"
              id="precio"
              name="precio"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              onChange={handleChange}
              type="number"
              id="stock"
              name="stock"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="estado"
              name="estado"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Crear Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearProducto;
