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

namespace appCredito.Controllers
{
    public class HomeController : Controller
    {
        private AppSettings settings =new AppSettings();
        public HomeController(IConfiguration iconfig){                    
          settings.completeURL=iconfig.GetSection("AppSettings:completeURL").Value;
          settings.completeURLAPP=iconfig.GetSection("AppSettings:completeURLAPP").Value;
          settings.apiClave=iconfig.GetSection("AppSettings:apiClave").Value;
        }
        public IActionResult Index()
        {
            string session=HttpContext.Session.GetString("token");
            if(session==null || session=="")
              return Redirect(settings.completeURLAPP);
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
