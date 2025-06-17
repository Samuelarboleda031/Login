import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'animate.css';

function FormularioRegistro() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'nombre':
        if (!value) {
          error = 'El nombre es obligatorio.';
        } else if (value.length < 5) {
          error = 'Mínimo 5 caracteres.';
        } else if (value.length > 30) {
          error = 'Máximo 30 caracteres.';
        }
        break;
      case 'apellidos':
        if (!value) {
          error = 'Los apellidos son obligatorios.';
        } else if (value.length < 5) {
          error = 'Mínimo 5 caracteres.';
        } else if (value.length > 30) {
          error = 'Máximo 30 caracteres.';
        }
        break;
      case 'telefono':
        if (!value) {
          error = 'El teléfono es obligatorio.';
        } else if (!/^\d+$/.test(value)) {
          error = 'Solo se permiten números.';
        } else if (value.length < 7 || value.length > 10) {
          error = 'Debe tener entre 7 y 10 dígitos.';
        }
        break;
      case 'email':
        if (!value) {
          error = 'El correo electrónico es obligatorio.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Formato de email inválido.';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    return error === '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  useEffect(() => {
    const { nombre, apellidos, telefono, email } = formData;
    const {
      nombre: nombreError,
      apellidos: apellidosError,
      telefono: telefonoError,
      email: emailError,
    } = errors;

    const allFieldsFilled = nombre && apellidos && telefono && email;
    const noErrors = !nombreError && !apellidosError && !telefonoError && !emailError;

    setIsFormValid(allFieldsFilled && noErrors);
  }, [formData, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidNombre = validateField('nombre', formData.nombre);
    const isValidApellidos = validateField('apellidos', formData.apellidos);
    const isValidTelefono = validateField('telefono', formData.telefono);
    const isValidEmail = validateField('email', formData.email);

    if (isValidNombre && isValidApellidos && isValidTelefono && isValidEmail) {
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Los datos han sido guardados correctamente.',
        confirmButtonText: 'Aceptar',
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });

      console.log('Datos del formulario:', formData);

      setFormData({
        nombre: '',
        apellidos: '',
        telefono: '',
        email: '',
      });
      setErrors({
        nombre: '',
        apellidos: '',
        telefono: '',
        email: '',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, corrige los errores en el formulario.',
        confirmButtonText: 'Aceptar',
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    }
  };

  return (
    <div className="formulario-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? 'input-error' : ''}
          />
          {errors.nombre && <p className="error-message">{errors.nombre}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="apellidos">Apellidos *</label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className={errors.apellidos ? 'input-error' : ''}
          />
          {errors.apellidos && <p className="error-message">{errors.apellidos}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono *</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className={errors.telefono ? 'input-error' : ''}
          />
          {errors.telefono && <p className="error-message">{errors.telefono}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <button type="submit" disabled={!isFormValid} className="btn-guardar">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default FormularioRegistro;