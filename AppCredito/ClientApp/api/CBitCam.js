import claim from './claim'
import moment from "moment"

class CBitCam {
    static obtenerSinAsignar(sucursalids,fechainicio,fechafin) 
    {     
        fechafin=moment(fechafin).utc().endOf('day').format()
        fechainicio=moment(fechainicio).utc().startOf('day').format()
        return claim.get('CambiosDomicilio', 'ObtenerCuentasSinAsignar',{sucursalids,fechainicio,fechafin});
    }
    static obtenerCuentasPreAsignadas()
    {
        return claim.get('CambiosDomicilio', 'obtenerCuentasPreAsignadas');
    }
    static cancelarAsignacion(idCambioDomicilio)
    {
        return claim.delete('CambiosDomicilio', 'CancelarAsignacion',idCambioDomicilio);
    }
    static obtenerAsignadas(cliente) 
    {
        return claim.get('CambiosDomicilio', 'ObtenerCuentasAsignadas',{cliente});
    }
    static obtenerRegistroCliente(idCambioDomicilio) 
    {
        return claim.get('CambiosDomicilio', 'ObtenerRegistroCliente',{idCambioDomicilio});
    }
    static preAsignarAgente(agente,idCambioDomicilio)
    {                
        if(agente==null)
            agente="NO APLICA";
        return claim.put('CambiosDomicilio', 'PreAsignarAgente',{agente,idCambioDomicilio});
    }
    static asignacion(registros)
    {      
        return claim.put('CambiosDomicilio', 'Asignacion',{registros});
    }
    static registrarValidacion(idCambioDomicilio,comentario,resultado){
        return claim.post('CambiosDomicilio', 'RegistrarValidacion',{idCambioDomicilio,comentario,resultado},{
            'headers': { 'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }
    static obtenerResultadosFinales(fechafin,fechainicio)
    {        
        fechafin=moment(fechafin).utc().endOf('day').format()
        fechainicio=moment(fechainicio).utc().startOf('day').format()
        return claim.get('CambiosDomicilio', 'ObtenerResultadosFinales',{fechafin,fechainicio});
    }
    
}

export default CBitCam