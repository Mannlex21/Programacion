using System;
using System.Diagnostics;
using System.Collections.Generic;

namespace appCredito.Models
{
  class User{
        public string originURL { get; set; }
        public string token { get; set; }
        public int id { get; set; }
        public Boolean activo { get; set; }
        public string empleado { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public List<Aplicacion> aplicaciones { get; set; }
        public List<Grupo> grupos { get; set; }

        public List<Accion> acciones {get;set;}
        public bool isValid()
        {            
            return (empleado == null) ? false : true;
        }
    }
}