//------------------------------------------------------------------------------
// <auto-generated>
//    Este código se generó a partir de una plantilla.
//
//    Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//    Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ProyectoPVl.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class CuatrimestreXSede
    {
        public CuatrimestreXSede()
        {
            this.OfertasAcademicas = new HashSet<OfertasAcademicas>();
        }
    
        public int id_CuatrimestreXSede { get; set; }
        public int id_SedeUniversitaria { get; set; }
        public string PeriodoLectivo { get; set; }
        public string Ano { get; set; }
        public string Estado { get; set; }
    
        public virtual SedesUniversitarias SedesUniversitarias { get; set; }
        public virtual ICollection<OfertasAcademicas> OfertasAcademicas { get; set; }
    }
}
