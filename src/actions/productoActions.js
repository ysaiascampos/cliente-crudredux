import clienteAxios from '../config/axios';
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';
import Swal from 'sweetalert2';

export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch( agregarProducto() );
        try {
            // insertar en la api
            await clienteAxios.post('/productos', producto);

            // Si todo esta bien actualizar el state
            dispatch( agregarProductoExito(producto) );
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            //si hay un error cambiar el state
            dispatch( agregarProductoError(true) );
            Swal.fire({
                icon:error,
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}
const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

// Funcion que descarga los productos de la base de datos

export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() );
        try {
            // insertar en la api
            const respuesta = await clienteAxios.get('/productos');
            // Si todo esta bien actualizar el state
            dispatch( descargaProductosExito(respuesta.data) );
        } catch (error) {
            console.log(error);
            //si hay un error cambiar el state
            dispatch( descargaProductosError(true) );
            Swal.fire({
                icon:error,
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExito = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = estado => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: estado
});

// Funcion que elimina los productos de la base de datos

export function eliminarProductosAction(id) {
    return async (dispatch) => {
        dispatch( obtenerEliminarProductos(id) );
        try {
            // eliminar en la api
            await clienteAxios.delete(`/productos/${id}`);
            // Si todo esta bien actualizar el state
            dispatch( eliminadoProductosExito() );
            Swal.fire(
                'Eliminado',
                'El producto se elimino correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            //si hay un error cambiar el state
            dispatch( eliminadoProductosError(true) );
            Swal.fire({
                icon:error,
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const obtenerEliminarProductos = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminadoProductosExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminadoProductosError = estado => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: estado
});

//Colocar producto en edición
export function obtenerProductoEditar(producto){
    return (dispatch) => {
        dispatch( obtenerProductoEditarAction(producto) );
    }
}
const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un producto en el componente
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch( editarProducto(producto) );
        try {
            // eliminar en la api
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            // Si todo esta bien actualizar el state
            dispatch( EditarProductosExito(producto) );
            Swal.fire(
                'Eliminado',
                'El producto se Edito correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            //si hay un error cambiar el state
            dispatch( EditarProductosError(true) );
            Swal.fire({
                icon:error,
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});

const EditarProductosExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const EditarProductosError = estado => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: estado
});