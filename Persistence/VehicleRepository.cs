using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vega.Core.Models;
using Vega.Persistence;

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

        public void Add(Vehicle vehicle){
            
            context.Vehicles.Add(vehicle);

        }

         public void Remove(Vehicle vehicle){
            
            context.Remove(vehicle);

        }
    }
}