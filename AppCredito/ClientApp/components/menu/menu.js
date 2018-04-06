export default [
    { 
        title: 'Bitácora de Domicilio', icon: 'build', path: '',tienepermiso:true,
        items: [
            {title: 'Asignación', icon: 'assignment', path: '/cambioDomicilio',permisos:['BitCamDom-Obtener','Asignacion-Agregar']},
            {title: 'Supervisión', icon: 'visibility', path: '/supervision',permisos:['BitResSuper-Obtener','ResSuper-Obtener']},
            {title: 'Correo', icon: 'email', path: '/emails',permisos:['Correo-Obtener']}
        ]
    }    
];