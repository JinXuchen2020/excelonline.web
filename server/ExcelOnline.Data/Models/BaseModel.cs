using System.ComponentModel.DataAnnotations.Schema;

namespace ExcelOnline.Data.Models
{
    public class BaseModel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
    }
}
