import claim from './claim'

class CSucursal {
    static obtener() {
        return claim.get('Sucursal', 'Obtener')
    }
}

export default CSucursal