using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vega.Core.Models;
using Vega.Persistence;
using Vega.Extensions;
namespace Vega.Core
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDBContext context;

        public VehicleRepository(VegaDBContext context)
        {
            this.context = context;
        }
        public async Task<Vehicle> GetVehicle(int id,bool inlcudeRelated = true){
            if(!inlcudeRelated)
            return await context.Vehicles.FindAsync(id);

           return await context.Vehicles
                .Include(v => v.Features)
                 .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                 .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }

        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj){
            // return await context.Vehicles
            // .Include(v =>v.Model)
            //  .ThenInclude(m => m.Make)
            // .Include(v => v.Features)
            //  .ThenInclude(vf =>vf.Feature)
            // .ToListAsync();
            var result = new QueryResult<Vehicle>();

            var query = context.Vehicles
            .Include(v =>v.Model)
             .ThenInclude(m => m.Make)
            .Include(v => v.Features)
             .ThenInclude(vf =>vf.Feature)
             .AsQueryable();

             //server side filtering
             if(queryObj.MakeId.HasValue)
             query = query.Where(v => v.Model.MakeId == queryObj.MakeId);

            //server side sorting
            // string str;
            // Expression<Func<Vehicle,object>> exp;
            
            
            var columnsMap = new Dictionary<string,Expression<Func<Vehicle,object>>>()
            //columnsMap.Add("make", v => v.Model.Make.Name);
            //same is written as object initialization syntax below 
            {
                ["make"] = v =>v.Model.Make.Name,
                ["model"] = v =>v.Model.Name,
                ["contactName"] = v => v.ContactName,
                ["id"] = v => v.Id
            };

            //moved to separate method
            // if(queryObj.IsSortAscending)
            // query = query.OrderBy(columnsMap[queryObj.SortBy]);
            // else
            //  query = query.OrderByDescending(columnsMap[queryObj.SortBy]);
            
            //query = ApplyOrdering(queryObj,query,columnsMap);
            //calling the extension method here
            query = query.ApplyOrdering(queryObj,columnsMap);
            
            //Below is re-wrtitten like above code
            // if(queryObj.SortBy == "make")
            // query = (queryObj.IsSortAscending) ? query.OrderBy(v =>v.Model.Make.Name): query.OrderByDescending(v => v.Model.Make.Name);
            // if(queryObj.SortBy == "model")
            // query = (queryObj.IsSortAscending) ? query.OrderBy(v =>v.Model.Name): query.OrderByDescending(v => v.Model.Name);
            // if(queryObj.SortBy == "contactName")
            // query = (queryObj.IsSortAscending) ? query.OrderBy(v =>v.ContactName): query.OrderByDescending(v => v.ContactName);
            // if(queryObj.SortBy == "id")
            // query = (queryObj.IsSortAscending) ? query.OrderBy(v =>v.Id): query.OrderByDescending(v => v.Id);

            result.TotalItems = await query.CountAsync();
            //Paging
            query = query.ApplyPaging(queryObj);
            
             result.Items = await query.ToListAsync();
             return result;
        }

       
        public void Add(Vehicle vehicle){
            
            context.Vehicles.Add(vehicle);

        }

         public void Remove(Vehicle vehicle){
            
            context.Remove(vehicle);

        }
    }
}