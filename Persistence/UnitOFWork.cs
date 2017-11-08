using System.Threading.Tasks;
using Vega.Core;

namespace Vega.Persistence
{
    public class UnitOFWork : IUnitOfWork
    {
        private readonly VegaDBContext context;

        public UnitOFWork(VegaDBContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}