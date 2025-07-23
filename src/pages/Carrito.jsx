import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet-async";

const Carrito = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mt-5">
        <Helmet>
          <title>Carrito vacío | Mi Tienda</title>
          <meta
            name="description"
            content="No hay productos en tu carrito actualmente."
          />
        </Helmet>
        <h2>Tu Carrito</h2>
        <p>No hay productos en el carrito.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Helmet>
        <title>Tu carrito | Mi Tienda</title>
        <meta
          name="description"
          content="Productos que agregaste a tu carrito."
        />
      </Helmet>
      <h2>Tu Carrito</h2>
      <ul className="list-group mb-3">
        {cart.map((producto) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={producto.id}
          >
            <div>
              <strong>{producto.nombre}</strong>
              <p className="mb-0">{producto.descripcion}</p>
              <span className="fw-bold">${producto.precio}</span>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeFromCart(producto.id)}
              aria-label={`Eliminar ${producto.nombre}`}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <button
        className="btn btn-outline-danger"
        onClick={clearCart}
        aria-label="Vaciar carrito"
      >
        Vaciar carrito
      </button>
    </div>
  );
};

export default Carrito;
