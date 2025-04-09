import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class ProductosService {
  static async getProductos() {
    try {
      const response = await axios.get(`${API_URL}/productos`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching productos:", error);
      throw error;
    }
  }

 static async getProducto(id) {
    try {
      const response = await axios.get(`${API_URL}/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching producto:", error);
      throw error;
    }
  }
}

export default ProductosService;