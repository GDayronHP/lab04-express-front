import { Link } from "react-router-dom"

function BackBtn() {
  return (
    <Link className="w-fit bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition absolute left-0 top-0 m-2" to="/"> Volver</Link>
  )
}

export default BackBtn
