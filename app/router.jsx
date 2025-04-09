import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListarProductos from "../modules/productos/components/listarProductos.jsx";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ListarProductos />} />
                {/* Puedes agregar más rutas aquí */}
            </Routes>
        </Router>
    );
}

export default AppRouter;