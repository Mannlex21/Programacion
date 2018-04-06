using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Collections.Generic;
using Newtonsoft.Json.Serialization;
using appCredito.Models;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;

namespace AppCobranza.Controllers
{
    public class LoginController : Controller
    {
        private AppSettings settings =new AppSettings();
        public LoginController(IConfiguration iconfig){                    
          settings.completeURL=iconfig.GetSection("AppSettings:completeURL").Value;
          settings.completeURLAPP=iconfig.GetSection("AppSettings:completeURLAPP").Value;
          settings.apiClave=iconfig.GetSection("AppSettings:apiClave").Value;

        }
        [HttpPost]
        public  IActionResult setToken(string authorizationToken, string origin)
        {                         
            User usuario=this.getTokenFromSecurity(authorizationToken);            
            if (usuario.isValid())
            {
                HttpContext.Session.SetString("token", authorizationToken);
                this.configUser(usuario);                
                HttpContext.Session.SetString("Data", JsonConvert.SerializeObject(usuario));
                return RedirectToAction("Index","Home");
            }
            else
            {
                return Redirect(origin);
            }                     
        }
        public IActionResult getOrigin(){
          return Content(JsonConvert.SerializeObject(settings));
        }
        [HttpGet]
        public IActionResult getSession()
        {      
            string session=HttpContext.Session.GetString("token");
            User usuario=getTokenFromSecurity();
            if(session!="" && session!=null && usuario.isValid())
            {              
              this.configUser(usuario);
              return Content(JsonConvert.SerializeObject(usuario));
            }            
            else{
              return StatusCode(401);
            }
        }
        private void configUser(User usuario)
        {
          usuario.token=HttpContext.Session.GetString("token");
          usuario.originURL=settings.completeURLAPP;
        }
        private User getTokenFromSecurity(string authorizationToken="")
        {
          using (HttpClient client = new HttpClient())
          {
              User user=new User();
              string session=HttpContext.Session.GetString("Data");
              if(session!="" && session!=null)
              {
                user=JsonConvert.DeserializeObject<User>(session);
              }
              
              client.BaseAddress = new Uri(settings.completeURL);
              MediaTypeWithQualityHeaderValue contentType =
                  new MediaTypeWithQualityHeaderValue("application/json");

              client.DefaultRequestHeaders.Accept.Add(contentType);
              client.DefaultRequestHeaders.Add("aplicacion_id",settings.apiClave);
              client.DefaultRequestHeaders.Authorization = 
              new AuthenticationHeaderValue("Bearer",(authorizationToken!=""?authorizationToken:user.token));
              HttpResponseMessage response = client.GetAsync("/Api/Usuario/ObtenerPerfil").Result;
              return JsonConvert.DeserializeObject<User>(response.Content.ReadAsStringAsync().Result);
          }
        }


        [HttpGet]
        public IActionResult getEmpleado()
        {
            var datos = HttpContext.Session.GetString("Data");
            User empleado = JsonConvert.DeserializeObject<User>(datos);


            return Content(empleado.empleado);
        }
       
    }

}