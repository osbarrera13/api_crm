import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import MsgErrors from './MsgErrors';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {

  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'Mínimo 3 Caracteres!')
      .max(50, 'Máximo 50 Caracteres!')
      .required('Campo Obligatorio.'),
    empresa: Yup.string()
      .min(3, 'Mínimo 3 Caracteres!')
      .max(50, 'Máximo 50 Caracteres!')
      .required('Campo Obligatorio.'),
    email: Yup.string()
      .email('E-mail no valido.')
      .required('Campo Obligatorio.'),
    telefono: Yup.number().typeError('Ingrese solo numeros')
      .min(12, 'Mínimo 12 Digitos!')
      .positive('Ingrese solo numeros positivos')
      .integer('Ingrese solo numeros'),
    notas: Yup.string()
      .max(255, 'Máximo 255 Caracteres!')
  })
 
  const handleSubmit = async (values) => {
    try {
      let url = ''
      let sendMethod = ''
      if (cliente.id) {
        url = `http://localhost:3001/clientes/${cliente.id}`
        sendMethod = 'PUT'
      } else {
        url = 'http://localhost:3001/clientes'
        sendMethod = 'POST'
      }
      const respuesta = await fetch(url, {
        method: sendMethod,
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await respuesta.json()
      navigate('/clientes')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    cargando ? <Spinner /> : (
      <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
          { cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente' }
        </h1>

        <Formik
          initialValues={{
            nombre: cliente?.nombre ?? '',
            empresa: cliente?.empresa ?? '',
            email: cliente?.email ?? '',
            telefono: cliente?.telefono ?? '',
            notas: cliente?.notas ?? ''
          }}
          enableReinitialize={true}
          onSubmit={ async (values, { resetForm } ) => {
            await handleSubmit(values)
            resetForm()
          }}
          validationSchema={nuevoClienteSchema}
        >
          {({ errors, touched }) => (
            <Form
              className='mt-10'
              >
              <div className='mb-4'>
                <label
                  htmlFor="nombre"
                  className='text-gray-800'
                  >Nombre:</label>
                <Field
                  id='nombre'
                  name='nombre'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Nombre del Cliente'
                />
                { errors.nombre && touched.nombre ? (
                  <MsgErrors>{errors.nombre}</MsgErrors>
                ) : null}
              </div>

              <div className='mb-4'>
                <label
                  htmlFor="empresa"
                  className='text-gray-800'
                  >Empresa:</label>
                <Field
                  id='empresa'
                  name='empresa'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Empresa del Cliente'
                />
                { errors.empresa && touched.empresa ? (
                  <MsgErrors>{errors.empresa}</MsgErrors>
                ) : null}
              </div>

              <div className='mb-4'>
                <label
                  htmlFor="email"
                  className='text-gray-800'
                  >E-mail:</label>
                <Field
                  id='email'
                  name='email'
                  type='email'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='E-mail del Cliente'
                />
                { errors.email && touched.email ? (
                  <MsgErrors>{errors.email}</MsgErrors>
                ) : null}
              </div>

              <div className='mb-4'>
                <label
                  htmlFor="telefono"
                  className='text-gray-800'
                  >Telefono:</label>
                <Field
                  id='telefono'
                  name='telefono'
                  type='tel'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Telefono del Cliente'
                />
                { errors.telefono && touched.telefono ? (
                  <MsgErrors>{errors.telefono}</MsgErrors>
                ) : null}
              </div>

              <div className='mb-4'>
                <label
                  htmlFor="notas"
                  className='text-gray-800'
                  >Notas:</label>
                <Field
                  as='textarea'
                  id='notas'
                  name='notas'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-50 h-40'
                  placeholder='Notas del Cliente'
                />
                { errors.notas && touched.notas ? (
                  <MsgErrors>{errors.notas}</MsgErrors>
                ) : null}
              </div>
              <input
                type="submit"
                value={ cliente?.nombre ? 'Actualizar Cliente' : 'Agregar Cliente' }
                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
              />
            </Form>
          )}
        </Formik>
      </div>
    )
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario