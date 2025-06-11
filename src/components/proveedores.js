import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cedula_ruc: '',
    nombre: '',
    ciudad: '',
    tipo_proveedor: '',
    direccion: '',
    telefono: '',
    email: '',
    usuario_creacion: 'admin',
  });

  const token = localStorage.getItem('token') || '';

  const fetchProveedores = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
      const response = await axios.get(`${apiUrl}/api/proveedores`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProveedores(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar proveedores');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
      const response = await axios.post(`${apiUrl}/api/proveedores`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProveedores([...proveedores, response.data]);
      setFormData({
        cedula_ruc: '',
        nombre: '',
        ciudad: '',
        tipo_proveedor: '',
        direccion: '',
        telefono: '',
        email: '',
        usuario_creacion: 'admin',
      });
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear proveedor');
    }
  };

  const handleDelete = async (cedula_ruc) => {
    if (window.confirm('¿Estás seguro de eliminar este proveedor?')) {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
        await axios.delete(`${apiUrl}/api/proveedores/${cedula_ruc}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProveedores(proveedores.filter((prov) => prov.cedula_ruc !== cedula_ruc));
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Error al eliminar proveedor');
      }
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container className="mt-4">
      <h1>Gestión de Proveedores</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={() => setShowForm(true)} className="mb-3">
        Agregar Proveedor
      </Button>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Cédula/RUC</th>
              <th>Nombre</th>
              <th>Ciudad</th>
              <th>Tipo</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.cedula_ruc}>
                <td>{proveedor.cedula_ruc}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.ciudad}</td>
                <td>{proveedor.tipo_proveedor}</td>
                <td>{proveedor.direccion}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.email}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2">
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(proveedor.cedula_ruc)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Cédula/RUC</Form.Label>
              <Form.Control
                type="text"
                name="cedula_ruc"
                value={formData.cedula_ruc}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Proveedor</Form.Label>
              <Form.Control
                type="text"
                name="tipo_proveedor"
                value={formData.tipo_proveedor}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Proveedores;