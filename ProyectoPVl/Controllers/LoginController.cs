using ProyectoPVl.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectoPVl.Controllers
{
    public class LoginController : Controller
    {
        gestionmatriculaEntities3 modeloBD = new gestionmatriculaEntities3();
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult VerificaLogin(RetornaUsuarioCorreo_Result pmodelo)
        {
            RetornaUsuarioCorreo_Result usuariobuscar = this.modeloBD.RetornaUsuarioCorreo(pmodelo.Usuario, pmodelo.contrasena).FirstOrDefault();
            if (usuariobuscar == null)
            {
                this.ModelState.AddModelError("", "Usuario o contraseña invalidos. Por favor verifique");
                return View("Index");
            }
            else
            {
                this.Session.Add("logueado", true);
                this.Session.Add("datosusuario", usuariobuscar);
                return RedirectToAction("Bienvenida", "Inicio");
            }
        }
        public ActionResult CerrarSesion()
        {
            this.Session.Add("logueado", null);
            this.Session.Add("datosusuario", null);
            return RedirectToAction("Index", "Login");
        }
        public ActionResult ActualizarFecha(int id_Usuario)
        {
           
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.ActualizarFechaCierre(id_Usuario);
                 

            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Fecha Actualizada";
                }
                else
                {
                    resultado += "No se pudo actualizar la fecha";
                }
            }
            return Json(resultado);
        }
    }
}
 