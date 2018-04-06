import claim from './claim'

class CAgentes {
    static obtener() {
        return claim.get('CambiosDomicilio', 'ObtenerAgentes')
    }
}

export default CAgentes