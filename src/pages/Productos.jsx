import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet-async";

const API_URL = "https://68812fe166a7eb81224a5384.mockapi.io/productos";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const obtenerProductos = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductos(res.data);
    } catch (error) {
      console.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  if (loading)
    return <div className="container mt-5">Cargando productos...</div>;

  return (
    <div className="container mt-5">
      <Helmet>
        <title>Productos disponibles | Mi Tienda</title>
        <meta
          name="description"
          content="Listado de productos disponibles para comprar."
        />
      </Helmet>
      <h2>Productos Disponibles</h2>
      <div className="row">
        {productos.map((producto) => (
          <div className="col-md-4 mb-4" key={producto.id}>
            <div
              className="card h-100"
              role="region"
              aria-label={`Producto: ${producto.nombre}`}
            >
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="card-text fw-bold">${producto.precio}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(producto)}
                  aria-label={`Agregar ${producto.nombre} al carrito`}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
