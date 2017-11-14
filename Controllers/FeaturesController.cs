using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Vega.Persistence;
using Vega.Controllers.Resources;
using Microsoft.EntityFrameworkCore;
using Vega.Core.Models;
using Microsoft.AspNetCore.Authorization;

namespace Vega.Controllers
{
    public class FeaturesController : Controller
    {
        private readonly VegaDBContext context;
        private readonly IMapper mapper;
        public FeaturesController(VegaDBContext context,IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("/api/features")]
        public async Task<IEnumerable<KeyValuePairResource>> GetFeatures(){

            var features = await context.Features.ToListAsync();
            return mapper.Map<List<Feature>,List<KeyValuePairResource>>(features);
            
        }
    }
}