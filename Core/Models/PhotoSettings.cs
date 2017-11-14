using System.IO;
using System.Linq;

namespace Vega.Core.Models
{
    public class PhotoSettings
    {
        public int MaxBytes { get; set; }
        public string[] AccetedFileTypes { get; set; }

        public bool IsSupported(string fileName){
            return AccetedFileTypes.Any(s => s == Path.GetExtension(fileName).ToLower());
        }
    }
}