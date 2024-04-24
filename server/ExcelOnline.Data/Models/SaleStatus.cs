using System.ComponentModel.DataAnnotations;

namespace ExcelOnline.Data.Models
{
    public class SaleStatus : BaseModel
    {
        public string CompanyName { get; set; }

        public string? BrandName { get; set; }
        public string? ShopName { get; set; }
        public string? StoreName { get; set; }
        public string? ContactName { get; set; }
        public string? ContactJob { get; set; }
        public string? ContactPhone { get; set; }
        public string? SalerName { get; set; }
        public decimal? SuccessfulRate { get; set; }
        [DataType(DataType.Date)]
        public DateTime? LinkUpDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime? BidDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime? VisitDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime? BidConfirmDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime? ContractDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime? SendDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime? RemarkDate { get; set; }
    }
}
