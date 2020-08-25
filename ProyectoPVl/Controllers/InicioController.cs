using ProyectoPVl.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectoPVl.Controllers
{
    public class InicioController : Controller
    {
        // GET: Inicio
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Bienvenida()
        {
            bool sesioniniciada = false;
            if (this.Session["logueado"] != null)
            {
                sesioniniciada = Convert.ToBoolean(this.Session["logueado"]);
            }
            if (sesioniniciada == true)
            {
                RetornaUsuarioCorreo_Result modelo =
                  (RetornaUsuarioCorreo_Result)this.Session["datosUsuario"];
                return View(modelo);
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }

        }
        public ActionResult Universidad()
        {

            return View();
        }
      
        public ActionResult Contacto()
        {
            return View();
        }
    }
}