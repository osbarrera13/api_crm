import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";
import Spinner from "../components/Spinner";

const EditarCliente = () => {
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
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Formulario para edición de un cliente</p>
      { cliente?.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        <p>Changos!! Cliente no valido</p>
      )}
    </>
  );
};

export default EditarCliente;
