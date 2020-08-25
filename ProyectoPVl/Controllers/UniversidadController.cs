using ProyectoPVl.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProyectoPVl.Controllers
{
    public class UniversidadController : Controller
    {
        gestionmatriculaEntities3 modeloBD = new gestionmatriculaEntities3();
        // GET: Universidad
        #region Catalogos

        #region Estudiantes
        public ActionResult AgregaEstudiante()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AgregaEstudiante(Estudiantes modeloVista)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.AgregarEstudiante(
                    modeloVista.NombreCompleto,
                    modeloVista.Cedula,
                    modeloVista.id_Provincia,
                    modeloVista.id_Canton,
                    modeloVista.id_Distrito,
                    modeloVista.Fecha_Inicio);

            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Estudiante insertado";
                }
                else
                {
                    resultado += ".No se pudo insertar el estudiante";
                }
            }
            Response.Write("<script language=javascript>alert('" + resultado + "');</script>");
            return View();
        }

        public ActionResult RetornaEstudiantesNombre(string nombre)
		{
            List<RetornaEstudiantes_Result> modeloVista = this.modeloBD.RetornaEstudiantes(nombre).ToList();

            return Json(modeloVista);
		}

        public ActionResult RetornaEstudiantesCedula(string cedula)
        {
            List<RetornaEstudiantesCed_Result> modeloVista = this.modeloBD.RetornaEstudiantesCed(cedula).ToList();

            return Json(modeloVista);
        }
        public ActionResult BuscaEstudiante()
		{
            return View();
		}

        public ActionResult ModificaEstudiante(int id_Estudiante)
        {
            RetornaEstudianteID_Result modeloVista = this.modeloBD.RetornaEstudianteID(id_Estudiante).FirstOrDefault();
            return View(modeloVista);
        }

        [HttpPost]
        public ActionResult ModificaEstudiante(RetornaEstudianteID_Result modeloVista)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.ActualizarEstudiante(
                    modeloVista.id_Estudiante,
                    modeloVista.NombreCompleto,
                    modeloVista.Cedula,
                    modeloVista.id_Provincia,
                    modeloVista.id_Canton,
                    modeloVista.id_Distrito,
                    modeloVista.Fecha_Inicio);

            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Estudiante modificado";
                }
                else
                {
                    resultado += ".No se pudo modificar";
                }
            }
            Response.Write("<script language=javascript>alert('" + resultado + "');</script>");
            return View(modeloVista);
        }

        public ActionResult EliminaEstudiante(int id_Estudiante)
        {
            RetornaEstudianteID_Result modeloVista = this.modeloBD.RetornaEstudianteID(id_Estudiante).FirstOrDefault();
            return View(modeloVista);
        }

        [HttpPost]
        public ActionResult EliminaEstudiante(RetornaEstudianteID_Result modeloVista)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.EliminaEstudiante(modeloVista.id_Estudiante);

            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados < 0)
                {
                    resultado = "Estudiante eliminado";
                }
                else
                {
                    resultado += ".No se pudo eliminar";
                }
            }
            Response.Write("<script language=javascript>alert('" + resultado + "');</script>");
            return View(modeloVista);
        }

        #endregion

        #region Funcionarios
        public ActionResult AgregaFuncionario()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AgregaFuncionario(string NombreCompleto, string Cedula, int id_Provincia, int id_Canton,
            int id_Distrito, DateTime FechaContratacion, string tipoUsuario, string contrasena)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.AgregarFuncionario(
                    NombreCompleto,
                    Cedula,
                    id_Provincia,
                    id_Canton,
                    id_Distrito,
                    FechaContratacion);
            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Funcionario insertado";
                    this.modeloBD.AgregarUsuario(NombreCompleto, Cedula, tipoUsuario, contrasena);
                }
                else
                {
                    resultado += "No se pudo insertar el funcionario";
                }
            }
            return Json(resultado);
        }

        public ActionResult RetornaFuncionariosNombre(string nombre)
        {
            List<RetornaFuncionarios_Result> modeloVista = this.modeloBD.RetornaFuncionarios(nombre).ToList();

            return Json(modeloVista);
        }

        public ActionResult RetornaFuncionariosCedula(string cedula)
        {
            List<RetornaFuncionarioCed_Result> modeloVista = this.modeloBD.RetornaFuncionarioCed(cedula).ToList();

            return Json(modeloVista);
        }
        public ActionResult BuscaFuncionario()
        {
            return View();
        }

        public ActionResult ModificaFuncionario(int id_Funcionario)
        {
            RetornaFuncionarioID_Result modeloVista = this.modeloBD.RetornaFuncionarioID(id_Funcionario).FirstOrDefault();
            return View(modeloVista);
        }

        [HttpPost]
        public ActionResult ModificaFuncionario(RetornaFuncionarioID_Result modeloVista)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.ActualizarFuncionario(
                    modeloVista.id_Funcionario,
                    modeloVista.NombreCompleto,
                    modeloVista.Cedula,
                    modeloVista.id_Provincia,
                    modeloVista.id_Canton,
                    modeloVista.id_Distrito,
                    modeloVista.FechaContratacion);

            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Funcionario modificado";
                }
                else
                {
                    resultado += "No se pudo modificar";
                }
            }
            Response.Write("<script language=javascript>alert('" + resultado + "');</script>");
            return View(modeloVista);
        }

        public ActionResult EliminaFuncionario(int id_Funcionario)
        {
            RetornaFuncionarioID_Result modeloVista = this.modeloBD.RetornaFuncionarioID(id_Funcionario).FirstOrDefault();
            return View(modeloVista);
        }

        [HttpPost]
        public ActionResult EliminaFuncionario(RetornaFuncionarioID_Result modeloVista)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.EliminaFuncionario(
                    modeloVista.id_Funcionario);
            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados < 0)
                {
                    resultado = "Funcionario eliminado";
                }
                else
                {
                    resultado += ".No se pudo eliminar";
                }
            }
            Response.Write("<script language=javascript>alert('" + resultado + "');</script>");
            return View(modeloVista);
        }

        #endregion

        #region Cursos
        public ActionResult AgregaCurso()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AgregaCurso(string Nombre, string Codigo)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.AgregarCursos(
                    Nombre,
                    Codigo);
            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Curso insertado";
                }
                else
                {
                    resultado += "No se pudo insertar el curso";
                }
            }
            return Json(resultado);
        }

        public ActionResult RetornaCursoNombre(string nombre)
        {
            List<RetornaCurso_Result> listaCursos = this.modeloBD.RetornaCurso(nombre).ToList();

            return Json(new
            {
                resultado = listaCursos
            });
        }

        public ActionResult RetornaCursoCodigo(string codigo)
        {
            List<RetornaCursoCod_Result> listaCursos = this.modeloBD.RetornaCursoCod(codigo).ToList();

            return Json(new
            {
                resultado = listaCursos
            });
        }

        public ActionResult BuscaCurso()
		{
            return View();
		}

        public ActionResult ModificaCurso(int id_Curso)
        {
            RetornaCursoID_Result modeloVista = this.modeloBD.RetornaCursoID(id_Curso).FirstOrDefault();
            return View(modeloVista);
        }

        [HttpPost]
        public ActionResult ModificaCurso(RetornaCursoID_Result modeloVista)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.ActualizarCurso(
                    modeloVista.id_Curso,
                    modeloVista.Nombre,
                    modeloVista.Codigo);

            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Curso modificado";
                }
                else
                {
                    resultado += "No se pudo modificar curso";
                }
            }
            return Json(resultado);
        }

        public ActionResult EliminaCurso(int id_Curso)
        {
            RetornaCursoID_Result modeloVista = this.modeloBD.RetornaCursoID(id_Curso).FirstOrDefault();
            return View(modeloVista);
        }

        [HttpPost]
        public ActionResult EliminaCurso(RetornaCursoID_Result modeloVista)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.EliminarCurso(
                    modeloVista.id_Curso);
            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados < 0)
                {
                    resultado = "Curso eliminado";
                }
                else
                {
                    resultado += "No se pudo eliminar el curso";
                }
            }
            return Json(resultado);
        }
        #endregion

        #region Direcciones de carrera
        public ActionResult AgregaDireccionCarrera()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AgregaDireccionCarrera(string Nombre, string Codigo, int id_Director, int id_Subdirector)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.AgregarDireccionesCarrera(
                    Nombre,
                    Codigo,
                    id_Director,
                    id_Subdirector);
            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Direccion de Carrera insertado";
                }
                else
                {
                    resultado += "No se pudo insertar la información";
                }
            }
            return Json(resultado);
        }

        public ActionResult RetornaDireccionCarreraNombre(string nombre)
        {
            List<RetornaDireccionCarrera_Result> listaDireccionCarrera = this.modeloBD.RetornaDireccionCarrera(nombre).ToList();

            return Json(new
            {
                resultado = listaDireccionCarrera
            });
        }

        public ActionResult RetornaDireccionCarreraCodigo(string codigo)
        {
            List<RetornaDireccionCarreraCod_Result> listaDireccionCarrera = this.modeloBD.RetornaDireccionCarreraCod(codigo).ToList();
         
            return Json(new
            {
                resultado = listaDireccionCarrera
            });
        }

        public ActionResult BuscaDireccionCarrera()
        {
            return View();
        }
        public ActionResult ModificaDireccionCarrera(int id_DireccionCarrera)
        {
            RetornaDireccionCarreraID_Result modeloVista = this.modeloBD.RetornaDireccionCarreraID(id_DireccionCarrera).FirstOrDefault();
            return View(modeloVista);
        }

        [HttpPost]
        public ActionResult ModificaDireccionCarrera(int id_DireccionCarrera, string Nombre, string Codigo,
                                                     int id_Director, int id_Subdirector)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.ActualizarDireccionesCarreras(
                    id_DireccionCarrera,
                    Nombre,
                    Codigo,
                    id_Director,
                    id_Subdirector);

            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Dirección de carrera modificado";
                }
                else
                {
                    resultado += "No se pudo modificar dirección de carrera";
                }
            }
            return Json(resultado);
        }

        public ActionResult EliminaDireccionCarrera(int id_DireccionCarrera)
        {
            RetornaDireccionCarreraID_Result modeloVista = this.modeloBD.RetornaDireccionCarreraID(id_DireccionCarrera).FirstOrDefault();
            return View(modeloVista);
        }

        [HttpPost]
        public ActionResult EliminaDireccionCarrera(RetornaDireccionCarreraID_Result modeloVista)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.EliminaDirrecionCarrera(
                    modeloVista.id_DireccionCarrera);
            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados < 0)
                {
                    resultado = "Dirección de carrera eliminado";
                }
                else
                {
                    resultado += "No se pudo eliminar el dirección de carrera";
                }
            }
            return Json(resultado);
        }
        #endregion

        #region Carreras
        public ActionResult AgregaCarrera()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AgregaCarrera(string nombre, string codigo, int id_DireccionCarrera)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.AgregarCarrerasUniversitarias(
                    nombre,
                    codigo,
                    id_DireccionCarrera);
            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Carrera insertada";
                }
                else
                {
                    resultado += "No se pudo insertar la carrera";
                }
            }
            return Json(resultado);
        }

		public ActionResult RetornaCarreraNombre(string nombre)
		{
			List<RetornaCarreraUniversitaria_Result> listaCarrera = this.modeloBD.RetornaCarreraUniversitaria(nombre).ToList();

			return Json(new
			{
				resultado = listaCarrera
			});
		}

		public ActionResult RetornanCarreraCodigo(string codigo)
		{
			List<RetornaCarreraUniversitariaCod_Result> listaCarrera = this.modeloBD.RetornaCarreraUniversitariaCod(codigo).ToList();

			return Json(new
			{
				resultado = listaCarrera
            });
		}

		public ActionResult BuscaCarrera()
		{
			return View();
		}

		public ActionResult ModificaCarrera(int id_CarreraUniversitaria)
		{
			RetornaCarreraUniversitariaID_Result modeloVista = this.modeloBD.RetornaCarreraUniversitariaID(id_CarreraUniversitaria).FirstOrDefault();
			return View(modeloVista);
		}

		[HttpPost]
		public ActionResult ModificaCarrera(int id_Carrera, string Nombre, string Codigo,
													 int id_DireccionCarrera)
		{
			int cantRegistrosAfectados = 0;
			string resultado = "";
			try
			{
				cantRegistrosAfectados = this.modeloBD.ActualizarCarrerasUniversitaria(
                    id_Carrera,
					Nombre,
					Codigo,
                    id_DireccionCarrera);
			}
			catch (Exception error)
			{
				resultado = "Ocurrio un error: " + error.Message;
			}
			finally
			{
				if (cantRegistrosAfectados > 0)
				{
					resultado = "Carrera modificada";
				}
				else
				{
					resultado += "No se pudo modificar la carrera";
				}
			}
			return Json(resultado);
		}

		public ActionResult EliminaCarrera(int id_CarreraUniversitaria)
		{
			RetornaCarreraUniversitariaID_Result modeloVista = this.modeloBD.RetornaCarreraUniversitariaID(id_CarreraUniversitaria).FirstOrDefault();
			return View(modeloVista);
		}

		[HttpPost]
		public ActionResult EliminaCarrera(RetornaCarreraUniversitariaID_Result modeloVista)
		{
			int cantRegistrosAfectados = 0;
			string resultado = "";
			try
			{
				cantRegistrosAfectados = this.modeloBD.EliminaCarrerasUniversitarias(
					modeloVista.id_CarreraUniversitaria);
			}
			catch (Exception error)
			{
				resultado = "Ocurrio un error: " + error.Message;
			}
			finally
			{
				if (cantRegistrosAfectados < 0)
				{
					resultado = "Carrera eliminada";
				}
				else
				{
					resultado += "No se pudo eliminar la carrera";
				}
			}
			return Json(resultado);
		}
        #endregion

        #region Sedes
        public ActionResult AgregaSede()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AgregaSede(string nombre, string codigo, int id_Director, int id_Provincia,
                                       int id_Canton, int id_Distrito, string direccionFisica)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.AgregarSedeUniversitaria(
                    nombre,
                    codigo,
                    id_Director,
                    id_Provincia,
                    id_Canton,
                    id_Distrito,
                    direccionFisica);
            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Sede universitaria insertada";
                }
                else
                {
                    resultado += "No se pudo insertar la sede universitaria";
                }
            }
            return Json(resultado);
        }

		public ActionResult RetornaSedeNombre(string nombre)
		{
			List<RetornaSedesUniversitarias_Result> listaSede = this.modeloBD.RetornaSedesUniversitarias(nombre).ToList();

			return Json(new
			{
				resultado = listaSede
            });
		}

		public ActionResult RetornanSedeCodigo(string codigo)
		{
			List<RetornaSedesUniversitariasCod_Result> listaSede = this.modeloBD.RetornaSedesUniversitariasCod(codigo).ToList();

			return Json(new
			{
				resultado = listaSede
            });
		}

		public ActionResult BuscaSede()
		{
			return View();
		}

		public ActionResult ModificaSede(int id_SedeUniversitaria)
		{
			RetornaSedesUniversitariasID_Result modeloVista = this.modeloBD.RetornaSedesUniversitariasID(id_SedeUniversitaria).FirstOrDefault();
			return View(modeloVista);
		}

		[HttpPost]
		public ActionResult ModificaSede(int id_SedeUniversitaria, string Nombre, string Codigo, int id_Director, 
                                         int id_Provincia, int id_Canton, int id_Distrito, string direccionFisica )
		{
			int cantRegistrosAfectados = 0;
			string resultado = "";
			try
			{
				cantRegistrosAfectados = this.modeloBD.ActualizarSedesUniversitarias(
                    id_SedeUniversitaria,
					Nombre,
					Codigo,
                    id_Director,
                    id_Provincia,
                    id_Canton,
                    id_Distrito,
                    direccionFisica);
			}
			catch (Exception error)
			{
				resultado = "Ocurrio un error: " + error.Message;
			}
			finally
			{
				if (cantRegistrosAfectados > 0)
				{
					resultado = "Sede universitaria modificada";
				}
				else
				{
					resultado += "No se pudo modificar la Sede universitaria";
				}
			}
			return Json(resultado);
		}

		public ActionResult EliminaSede(int id_SedeUniversitaria)
		{
			RetornaSedesUniversitariasID_Result modeloVista = this.modeloBD.RetornaSedesUniversitariasID(id_SedeUniversitaria).FirstOrDefault();
			return View(modeloVista);
		}

		[HttpPost]
		public ActionResult EliminaSede(RetornaSedesUniversitariasID_Result modeloVista)
		{
			int cantRegistrosAfectados = 0;
			string resultado = "";
			try
			{
				cantRegistrosAfectados = this.modeloBD.EliminaSedesUniversitarias(
					modeloVista.id_SedeUniversitaria);
			}
			catch (Exception error)
			{
				resultado = "Ocurrio un error: " + error.Message;
			}
			finally
			{
				if (cantRegistrosAfectados < 0)
				{
					resultado = "Sede universitaria eliminada";
				}
				else
				{
					resultado += "No se pudo eliminar la sede universitaria";
				}
			}
			return Json(resultado);
		}
        #endregion

        #region CursosxCarrera
        public ActionResult AgregaCursoxCarrera()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AgregaCursoxCarrera(int id_Curso, int id_CarreraUniversitaria, int id_CursoRequerido)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.AgregarCursosPorCarreras(
                    id_Curso,
                    id_CarreraUniversitaria,
                    id_CursoRequerido);
            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Curso de carrera insertado";
                }
                else
                {
                    resultado += "No se pudo insertar el curso de la carrera";
                }
            }
            return Json(resultado);
        }

        public ActionResult RetornaCursoxCarrera(int id_CarreraUniversitaria)
        {
            List<RetornaCursoPorCarrera_Result> listaCursoxCarrera = this.modeloBD.RetornaCursoPorCarrera(id_CarreraUniversitaria).ToList();

            return Json(new
            {
                resultado = listaCursoxCarrera
            });
        }

		public ActionResult BuscaCursoxCarrera()
		{
			return View();
		}

		public ActionResult ModificaCursoxCarrera(int id_CursoPorCarrera)
		{
			RetornaCursoPorCarreraID_Result modeloVista = this.modeloBD.RetornaCursoPorCarreraID(id_CursoPorCarrera).FirstOrDefault();
			return View(modeloVista);
		}

		[HttpPost]
		public ActionResult ModificaCursoxCarrera(int id_CursoPorCarrera, int id_CursoRequisito, 
                                                       int id_CarreraUniversitaria, int id_Curso)
		{
			int cantRegistrosAfectados = 0;
			string resultado = "";
			try
			{
				cantRegistrosAfectados = this.modeloBD.ActualizarCursosPorCarrera(
                    id_CursoPorCarrera,
                    id_CursoRequisito,
                    id_CarreraUniversitaria,
                    id_Curso);
			}
			catch (Exception error)
			{
				resultado = "Ocurrio un error: " + error.Message;
			}
			finally
			{
				if (cantRegistrosAfectados > 0)
				{
					resultado = "Curso por carrera modificado";
				}
				else
				{
					resultado += "No se pudo modificar el curso por carrera";
				}
			}
			return Json(resultado);
		}

		public ActionResult EliminaCursoxCarrera(int id_CursoPorCarrera)
		{
			RetornaCursoPorCarreraID_Result modeloVista = this.modeloBD.RetornaCursoPorCarreraID(id_CursoPorCarrera).FirstOrDefault();
			return View(modeloVista);
		}

		[HttpPost]
		public ActionResult EliminaCursoxCarrera(RetornaCursoPorCarreraID_Result modeloVista)
		{
			int cantRegistrosAfectados = 0;
			string resultado = "";
			try
			{
				cantRegistrosAfectados = this.modeloBD.EliminarCursoPorCarrera(
					modeloVista.id_CursoPorCarrera);
			}
			catch (Exception error)
			{
				resultado = "Ocurrio un error: " + error.Message;
			}
			finally
			{
				if (cantRegistrosAfectados < 0)
				{
					resultado = "Curso por carrera eliminado";
				}
				else
				{
					resultado += "No se pudo eliminar el curso por carrera";
				}
			}
			return Json(resultado);
		}
		#endregion

		#endregion

		#region Procesos

		#region Cuatrimestre X Sede

        [HttpPost]
        public ActionResult AgregaCuatrimestreXSede(string Ano, int Sede, string Cuatrimestre)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                string estado = "Activo"; 

				cantRegistrosAfectados = this.modeloBD.AgregarCuatrimestresxSede(
					Sede,
					Cuatrimestre,
					Ano,
                    estado);
			}
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Cuatrimestre por sede insertado";
                }
                else
                {
                    resultado += "No se pudo insertar el cuatrimestre por sede";
                }
            }
            return Json(resultado);
        }

        public ActionResult RetornaCuatrimestrexSede()
        {
            List<RetornaCuatrimestreXSede_Result> listaCuatrixSede = this.modeloBD.RetornaCuatrimestreXSede().ToList();

            return Json(new
            {
                resultado = listaCuatrixSede
            });
        }

        public ActionResult BuscaCuatrimestrexSede()
		{
            return View();
		}

        #endregion

        #region OfertaCurso X Sede
        public ActionResult AgregaOfertaCursoxSede(int id_CuatrimestreXSede)
		{
            RetornaCuatrimestreXSedeID_Result modeloVista = this.modeloBD.RetornaCuatrimestreXSedeID(id_CuatrimestreXSede).FirstOrDefault();
            return View(modeloVista);
		}

        [HttpPost]
        public ActionResult AgregaOfertaCursoxSede(int Id_CuatrimestreXSede, int Curso, int Cupos)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.AgregarOfertasAcademidas(
                    Id_CuatrimestreXSede,
                    Curso,
                    Cupos);
            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Oferta academica insertada";
                }
                else
                {
                    resultado += "No se pudo insertar la oferta academica";
                }
            }
            return Json(resultado);
        }

        public ActionResult RetornaOfertaAcademica()
        {
            List<RetornaOfertaAcademica_Result> listaOferta = this.modeloBD.RetornaOfertaAcademica().ToList();

            return Json(new
            {
                resultado = listaOferta
            });
        }

		#endregion

		#region Matricula X Estudiante
        public ActionResult ConsultarOfertaXEstudiante(int id_Estudiante)
		{
            RetornaEstudianteID_Result modeloVista = this.modeloBD.RetornaEstudianteID(id_Estudiante).FirstOrDefault();
            return View(modeloVista);
        }

        public ActionResult ConsultaOfertaAcademica(int ind_Carrera,  int id_SedeUniversitaria, string ano, string cuatrimestre)
        {
            List<ConsultaOfertaAcademica_Result> listaOferta = 
                this.modeloBD.ConsultaOfertaAcademica(ind_Carrera, id_SedeUniversitaria, ano, cuatrimestre).ToList();

            return Json(new
            {
                resultado = listaOferta
            });
        }

        [HttpPost]
        public ActionResult AgregaMatricula(int id_Estudiante, int id_CarreraUniversitaria, int id_OfertaAcademica)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.AgregarMatricula(
                    id_Estudiante,
                    id_CarreraUniversitaria,
                    id_OfertaAcademica);
            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Matricula insertada";
                }
                else
                {
                    resultado += "No se pudo matricular al estudiante";
                }
            }
            return Json(resultado);
        }

        public ActionResult RetornaMatriculaIdEstudiante(int id_Estudiante)
		{
            List<RetornaMatriculaIdEstudiante_Result> listaMatricula = 
                this.modeloBD.RetornaMatriculaIdEstudiante(id_Estudiante).ToList();
            return Json(new
            {
                resultado = listaMatricula
            });
        }

        #endregion

        #region Notas X Estudiantes

        public ActionResult RegistroNotas()
		{
            return View();
		}

        public ActionResult RetornaNotas(int id_SedeUniversitaria, string Ano, string cuatrimestre, int id_Curso)
        {
            List<RetornaNotasPorCurso_Result> listaNotas =
                this.modeloBD.RetornaNotasPorCurso(id_SedeUniversitaria, Ano, cuatrimestre, id_Curso).ToList();
            return Json(new
            {
                resultado = listaNotas
            });
        }

        [HttpPost]
        public ActionResult ModificaNota(int id_Matricula, int Nota)
        {
            int cantRegistrosAfectados = 0;
            string resultado = "";
            try
            {
                cantRegistrosAfectados = this.modeloBD.ActualizaNota(
                    id_Matricula,
                    Nota);
            }
            catch (Exception error)
            {
                resultado = "Ocurrio un error: " + error.Message;
            }
            finally
            {
                if (cantRegistrosAfectados > 0)
                {
                    resultado = "Nota modificada";
                }
                else
                {
                    resultado += "No se pudo modificar la nota";
                }
            }
            return Json(resultado);
        }

		#endregion

		#endregion

		#region Reportes

        public ActionResult ReporteNotas()
		{
            return View();
		}

        public ActionResult ReporteNotasXSedeXAnoXCuatriXCurso(int id_SedeUniversitaria, string Ano, string cuatrimestre, int id_Curso)
        {
            List<RetornaNotas_Result> listaNotas =
                this.modeloBD.RetornaNotas(id_SedeUniversitaria, Ano, cuatrimestre, id_Curso).ToList();
            return Json(new
            {
                resultado = listaNotas
            });
        }

        #endregion

        #region Geografia
        //Retorna todas las provincias
        public ActionResult RetornaProvincias()
        {
            List<RetornaProvincias_Result> provincias = this.modeloBD.RetornaProvincias(null).ToList();

            return Json(provincias);
        }

        //Retorna todos los cantones
        public ActionResult RetornaCantones(int id_Provincia)
        {
            List<RetornaCantones_Result> cantones = this.modeloBD.RetornaCantones(null, id_Provincia).ToList();
            return Json(cantones);
        }

        //Retorna todos los distritos
        public ActionResult RetornaDistritos(int id_Canton)
        {
            List<RetornaDistrito_Result> distritos = this.modeloBD.RetornaDistrito(null, id_Canton).ToList();
            return Json(distritos);
        }
        #endregion
     
    }
}