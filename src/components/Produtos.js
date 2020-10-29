import React, { Fragment, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosAction } from '../actions/productoActions';
import Producto from './Producto';

const Productos = () => {
    // utilizar el use dispatch y te crea una función
    const dispatch = useDispatch();

    useEffect(() => {
       const cargandoProductos = () => dispatch( obtenerProductosAction() );
       cargandoProductos();
       // eslint-disable-next-line
    }, []);

    // Acceder al state del store
    const productos = useSelector(state => state.productos.productos);
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);

    return ( 
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos</h2>
            { cargando ? <p className="text-center">Cargando...</p> : null }
            { error ? <p className="font-weight-bold alert alert-danger mt-4 text-center">Hubo un error</p> : null }
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { productos.length === 0 ? (<tr><td>'No hay productos'</td></tr>): (
                        productos.map(producto => (
                            <Producto
                            key={producto.id}
                            producto={producto}
                            />
                        ))
                    )}
                </tbody>

            </table>
        </Fragment>
     );
}
 
export default Productos;