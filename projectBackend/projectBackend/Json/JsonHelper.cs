using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projectBackend.Json
{
  public class JsonHelper<T>
  {
    public T Jsonify(T obj)
    {
      var str = JsonConvert.SerializeObject(obj);
      return JsonConvert.DeserializeObject<T>(str);
    }
  }
}
