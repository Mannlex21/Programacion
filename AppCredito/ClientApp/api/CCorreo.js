import claim from './claim'

class Correo
{    
    static obtenerCorreos()
    {
        return claim.get('Correo', 'Obtener');
    }
    static insertarCorreo(correo)
    {
        return claim.post('Correo', 'Agregar',correo, {
            'headers': { 'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }   
    static actualizarCorreo(correo)
    {
        return claim.put('Correo', 'Modificar',correo);
    }
    static eliminarCorreo(id)
    {
        return claim.delete('Correo', 'eliminar',id);
    }
}

export default Correo;