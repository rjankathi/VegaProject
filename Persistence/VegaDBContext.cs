using Microsoft.EntityFrameworkCore;
using Vega.Core.Models;

namespace Vega.Persistence
{
    public class VegaDBContext : DbContext
    {

        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features {get; set;}
        public DbSet<Vehicle> Vehicles {get; set;}

        public DbSet<Model> Models { get; set; } 
        public VegaDBContext(DbContextOptions<VegaDBContext> options):base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelbuilder){

         modelbuilder.Entity<VehicleFeature>().HasKey(VehicleFeature=>
         new {VehicleFeature.VehicleId,VehicleFeature.FeatureId});   
        }
    }
}