import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://662aa3f767df268010a0132e.mockapi.io/productos";

const AdminPanel = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: "", precio: "", descripcion: "" });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const obtenerProductos = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductos(res.data);
    } catch (error) {
      toast.error("Error al obtener productos");
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    if (!form.nombre.trim()) return "El nombre es obligatorio";
    if (Number(form.precio) <= 0) return "El precio debe ser mayor a 0";
    if (form.descripcion.length < 10)
      return "La descripción debe tener al menos 10 caracteres";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validarFormulario();
    if (error) return toast.error(error);

    try {
      if (modoEdicion) {
        await axios.put(`${API_URL}/${idEditando}`, form);
        toast.success("Producto actualizado");
      } else {
        await axios.post(API_URL, form);
        toast.success("Producto agregado");
      }
      setForm({ nombre: "", precio: "", descripcion: "" });
      setModoEdicion(false);
      setIdEditando(null);
      obtenerProductos();
    } catch (error) {
      toast.error("Error al guardar el producto");
    }
  };

  const editarProducto = (producto) => {
    setForm({
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
    });
    setModoEdicion(true);
    setIdEditando(producto.id);
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Producto eliminado");
      obtenerProductos();
    } catch (error) {
      toast.error("Error al eliminar producto");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Panel de Administración</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            value={form.precio}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          {modoEdicion ? "Actualizar Producto" : "Agregar Producto"}
        </button>
        {modoEdicion && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setModoEdicion(false);
              setForm({ nombre: "", precio: "", descripcion: "" });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <h4>Listado de Productos</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.nombre}</td>
              <td>${prod.precio}</td>
              <td>{prod.descripcion}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editarProducto(prod)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarProducto(prod.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
