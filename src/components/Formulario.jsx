// rfce
import {useState, useEffect} from 'react';
import Error from './Error';

function Formulario({pacientes, setPacientes, paciente, setPaciente}) {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => { // hook para cuando el estado de paciente cambie >> en editar
    if(Object.keys(paciente).length > 0){ // verificar si el objeto esta vacio
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas
          )
    }
  }, [paciente])

  const genrarId = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)

    return random + fecha
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      // Validacion del formulario
      if( [ nombre, propietario, email, fecha, sintomas ].includes('') ) {
        setError(true)
        return;
      }

      setError(false)

      // Obj de Paciente
      const objPaciente ={
        nombre, 
        propietario, 
        email, 
        fecha, 
        sintomas
      }

      

      if(paciente.id){
        // Editando Registro  
        objPaciente.id = paciente.id
        const pacientesActualizado = pacientes.map( pacienteSatate => 
          pacienteSatate.id === paciente.id ? objPaciente : pacienteSatate) // si no es el mismo id devuelve el anterior si es el nuevo id devuelve el nuevo

        setPacientes(pacientesActualizado)

        setPaciente({})

      } else {
        //Nuevo registro
        objPaciente.id = genrarId()
        setPacientes([...pacientes, objPaciente]) // Agregar pacientes sin modificar el arreglo original
      }

      //Reiniciar el formulario
      setNombre('')
      setPropietario('')
      setEmail('')
      setFecha('')
      setSintomas('')
  }


  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h1 className='font-black text-3xl text-center'>
            Seguimiento Pacientes
        </h1>

        <p className='text-lg mt-5 text-center mb-10'>
            Añade Pacientes y {' '}
            <span className='text-indigo-600 font-bold'>Administralos</span>
        </p>

        <form 
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            >
            {error && 
              <Error><p>'Todos los campos son obligatorios'</p></Error>  // otra forma de pasar propr, te deja poner mas codigo HTML
            }

            <div className='mb-5'>
                <label 
                  // Cuando toca nombre mascota se habilita el input
                  htmlFor='mascota'
                  //display black > toma todo el espacio disponible
                  className='block text-gray-700 uppercase font-bold'>
                  Nombre Mascota
                </label>

                <input 
                  id='mascota'
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                  type="text" 
                  placeholder='Nombre de la Mascota'
                  value={nombre}
                  onChange={ (e) => setNombre(e.target.value) } // callback > evento de reack que guarda el nombre
                />
            </div>

            <div className='mb-5'>
                <label 
                  // Cuando toca nombre mascota se habilita el input
                  htmlFor='propietario'
                  //display black > toma todo el espacio disponible
                  className='block text-gray-700 uppercase font-bold'>
                  Nombre Propietario
                  
                </label>

                <input 
                  id='propietario'
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                  type="text" 
                  placeholder='Nombre del Propietario'
                  value={propietario}
                  onChange={ (e) => setPropietario(e.target.value) }
                />
            </div>

            <div className='mb-5'>
                <label 
                  // Cuando toca nombre mascota se habilita el input
                  htmlFor='email'
                  //display black > toma todo el espacio disponible
                  className='block text-gray-700 uppercase font-bold'>
                  Email
                </label>

                <input 
                  id='email'
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                  type="email" 
                  placeholder='Email Contacto Propietario'
                  value={email}
                  onChange={ (e) => setEmail(e.target.value) }
                />
            </div>

            <div className='mb-5'>
                <label 
                  htmlFor='alta'
                  className='block text-gray-700 uppercase font-bold'>
                  Alta
                </label>

                <input 
                  id='alta'
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                  type="date" 
                  value={fecha}
                  onChange={ (e) => setFecha(e.target.value) }
                />
            </div>

            <div className='mb-5'>
                <label 
                  // Cuando toca nombre mascota se habilita el input
                  htmlFor='sintomas'
                  //display black > toma todo el espacio disponible
                  className='block text-gray-700 uppercase font-bold'>
                  Síntomas
                </label>
                <textarea 
                  id='sintomas'
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  placeholder='Describe los Síntomas'
                  value={sintomas}
                  onChange={ (e) => setSintomas(e.target.value) }
                />
            </div>

            <input 
              type="submit" 
              className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'
              value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
            />
        </form>
    </div>
  )
}

export default Formulario
