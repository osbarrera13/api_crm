import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setCargando(!cargando);
    const ObtenerCLienteAPI = async () => {
      try {
        const url = `http://localhost:3001/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    ObtenerCLienteAPI();
  }, []);

  return (
    <>
      {cargando ? (
        <Spinner />
      ) : Object.keys(cliente).length === 0 ? (
        <p className="font-bold text-4xl text-center text-blue-900">
          No hay resultados
        </p>
      ) : (
        <>
          <h1 className="font-black text-4xl text-blue-900">
            Ver Cliente {cliente.nombre}
          </h1>
          <p className="mt-3">Información del Cliente</p>

          <p className="text-4xl text-gray-600 mt-10">
            <span className="text-gray-800 font-bold uppercase mr-2">
              Nombre:
            </span>
            {cliente.nombre}
          </p>
          <p className="text-2xl text-gray-600 pt-3">
            <span className="text-gray-800 font-bold uppercase mr-2">
              Empresa:
            </span>
            {cliente.empresa}
          </p>
          <p className="text-2xl text-gray-600 pt-3">
            <span className="text-gray-800 font-bold uppercase mr-2">
              Email:
            </span>
            {cliente.email}
          </p>
          {cliente.telefono && (
            <p className="text-2xl text-gray-600 pt-3">
              <span className="text-gray-800 font-bold uppercase mr-2">
                Teléfono:
              </span>
              {cliente.telefono}
            </p>
          )}
          {cliente.notas && (
            <p className="text-2xl text-gray-600 pt-3">
              <span className="text-gray-800 font-bold uppercase mr-2">
                Notas:
              </span>
              {cliente.notas}
            </p>
          )}
        </>
      )}
    </>
  );
};

export default VerCliente;
