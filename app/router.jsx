import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ListarProductos from "../modules/productos/pages/ListarProductos";
import CrearProducto from "../modules/productos/pages/CrearProducto";
import EditarProducto from "../modules/productos/pages/EditarProducto";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ListarProductos />} />
                <Route path="/crearProducto" element={<CrearProducto />} />
                <Route path="/editarProducto/:id" element={<EditarProducto />} />
                {/* Puedes agregar más rutas aquí */}
            </Routes>
        </Router>
    );
}

export default AppRouter;