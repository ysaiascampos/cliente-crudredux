import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';
import { useHistory } from 'react-router-dom'

const EditarProducto = () => {

    const history =  useHistory();
    const [producto, setProducto] = useState({
        nombre: '',
        precio: ''
    })

    // utilizar el use dispatch y te crea una función
    const dispatch = useDispatch();
    // Acceder al state del store
    const productoeditar = useSelector(state => state.productos.productoeditar);

    useEffect(() => {
        setProducto(productoeditar);
    }, [productoeditar])

    const {nombre, precio}= producto;

    const onChangeFormulario = e => {
        setProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const submitEditarProduto = e => {
        e.preventDefault();

        dispatch(editarProductoAction(producto));

        history.push('/');
    }
    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>
                        <form
                            onSubmit={submitEditarProduto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase"
                            >Guardar Cambios  
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducto;