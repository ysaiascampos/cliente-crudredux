import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { eliminarProductosAction, obtenerProductoEditar } from '../actions/productoActions';
import Swal from 'sweetalert2';

const Producto = ({producto}) => {
    const { id, nombre, precio} = producto;

    // utilizar el use dispatch y te crea una función
    const dispatch = useDispatch();
    // habilitar history para redireccion
    const history = useHistory();

    //Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {
        //pregunta al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                // pasar al action
                dispatch(eliminarProductosAction(id));
            }
          });
    }

    // funcio que redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto.id}`)
    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">
                <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={() => redireccionarEdicion(producto)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >Eliminar</button>
            </td>
        </tr>
     );
}
 
export default Producto;