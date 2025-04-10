import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/';

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

  static async createProducto(producto) {
    try {
      const response = await axios.post(`${API_URL}/productos`, producto);
      return response.data;
    } catch (error) {
      console.error("Error creating producto:", error);
      throw error;
    }
  }

  static async updateProducto(id, producto) {
    try {
      const response = await axios.patch(`${API_URL}/productos/${id}`, producto);
      return response.data;
    } catch (error) {
      console.error("Error updating producto:", error);
      throw error;
    }
  }
  static async deleteProducto(id) {
    try {
      const response = await axios.delete(`${API_URL}/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting producto:", error);
      throw error;
    }
  }
}

export default ProductosService;