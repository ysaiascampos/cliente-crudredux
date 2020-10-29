import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types';

export function mostrarAlertaAction(alerta){
    return (dispatch) => {
        dispatch( mostrarAlerta(alerta) )
    }
}
const mostrarAlerta = alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
})

export function ocultarAlertaAction(alerta){
    return (dispatch) => {
        dispatch( ocultarAlerta(alerta) )
    }
}
const ocultarAlerta = () => ({
    type: OCULTAR_ALERTA
})