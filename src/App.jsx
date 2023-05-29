import {useState, useEffect } from 'react';
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPaciente from "./components/ListadoPaciente"

function App() {
  // npm run dev
  // Aca se realizan todas las funciones
  
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  const eliminarPaciente = id => {
    const pacientesActualizado = pacientes.filter( paciente => paciente.id !== id)
    setPacientes(pacientesActualizado)
  }

  // Al recargar no se pierden los cambios > No anda :(

  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS)
    }
    obtenerLS();
  }, []);

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify( pacientes ));
  }, [pacientes])

  return (
      <div className="container mx-auto mt-20"> 
        <Header />
  
        <div className="mt-12 md:flex">
        <Formulario 
          pacientes = {pacientes}  // props
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente = {setPaciente}
        />
        <ListadoPaciente 
          pacientes = {pacientes}
          setPaciente = {setPaciente}
          eliminarPaciente = {eliminarPaciente}
        />
        </div>

      </div>
  )
}

export default App
