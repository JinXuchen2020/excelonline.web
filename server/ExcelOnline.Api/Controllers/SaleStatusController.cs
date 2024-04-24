﻿using AutoMapper;
using ExcelOnline.Api.Options;
using ExcelOnline.Api.Services;
using ExcelOnline.Api.Transfers;
using ExcelOnline.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExcelOnline.Api.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class SaleStatusController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ISaleStatusService saleStatusService;

        public SaleStatusController(
            IMapper mapper,
            ISaleStatusService groupService)
        {
            this.mapper = mapper;
            this.saleStatusService = groupService;
        }

        [HttpGet("saleInfos")]
        public async Task<ActionResult<QueryResponse<SaleStatusTransOut>>> GetSaleInfos([FromQuery] SaleQueryOption option)
        {
            var result = await this.saleStatusService.GetSaleInfos(option);
            var resultTransOut = result.Select(i => this.mapper.Map<SaleStatusTransOut>(i)).ToList();

            return Ok(QueryResponse.New(option, resultTransOut));
        }

        [HttpGet("saleInfos/{id:int}")]
        public async Task<ActionResult<SaleStatusTransOut>> GetSaleInfo(int id)
        {
            var result = await this.saleStatusService.GetSaleStatus(id);
            result.IsEditing = true;
            await this.saleStatusService.UpdateSaleStatus(result);
            var resultTransOut = this.mapper.Map<SaleStatusTransOut>(result);

            return Ok(resultTransOut);
        }

        [HttpPost("saleInfos")]
        public async Task<ActionResult> CreateSaleInfo([FromBody] SaleStatusTransIn transIn)
        {
            var result = this.mapper.Map<SaleStatus>(transIn);
            await this.saleStatusService.AddSaleStatus(result);
            return Ok();
        }

        [HttpPut("saleInfos/{id:int}")]
        public async Task<ActionResult> UpdateSaleStatus(int id, [FromBody] SaleStatusTransIn transIn)
        {
            var result = this.mapper.Map<SaleStatus>(transIn);
            result.Id = id;
            result.IsEditing = false;
            await this.saleStatusService.UpdateSaleStatus(result);
            return Ok();
        }

        [HttpDelete("saleInfos/{id:int}")]
        public async Task<ActionResult> DeleteSaleStatus(int id)
        {
            await this.saleStatusService.DeleteSaleStatus(id);
            return Ok();
        }
    }
}
