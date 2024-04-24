using AutoMapper;
using ExcelOnline.Api.Transfers;
using ExcelOnline.Data.Models;

namespace ExcelOnline.Api.Unities
{
    public class TransfersMappingProfile : Profile
    {
        public TransfersMappingProfile()
        {

            CreateMap<SaleStatus, SaleStatusTransOut>()
                .ForMember(dest => dest.LinkUpDate, opt => opt.MapFrom(x => x.LinkUpDate.HasValue ? x.LinkUpDate.Value.ToShortDateString() : string.Empty))
                .ForMember(dest => dest.BidDate, opt => opt.MapFrom(x => x.BidDate.HasValue ? x.BidDate.Value.ToShortDateString() : string.Empty))
                .ForMember(dest => dest.VisitDate, opt => opt.MapFrom(x => x.VisitDate.HasValue ? x.VisitDate.Value.ToShortDateString() : string.Empty))
                .ForMember(dest => dest.BidConfirmDate, opt => opt.MapFrom(x => x.BidConfirmDate.HasValue ? x.BidConfirmDate.Value.ToShortDateString() : string.Empty))
                .ForMember(dest => dest.ContractDate, opt => opt.MapFrom(x => x.ContractDate.HasValue ? x.ContractDate.Value.ToShortDateString() : string.Empty))
                .ForMember(dest => dest.SendDate, opt => opt.MapFrom(x => x.SendDate.HasValue ? x.SendDate.Value.ToShortDateString() : string.Empty))
                .ForMember(dest => dest.RemarkDate, opt => opt.MapFrom(x => x.RemarkDate.HasValue ? x.RemarkDate.Value.ToShortDateString() : string.Empty));

            CreateMap<SaleStatusTransIn, SaleStatus>();           

            CreateMap<User, UserTransOut>();
            CreateMap<UserTransIn, User>();
        }
    }
}
