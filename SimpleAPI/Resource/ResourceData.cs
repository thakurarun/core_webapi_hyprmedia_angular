using SimpleAPI.CustomUrlHelper;
using System.Collections;
using System.Collections.Generic;

namespace SimpleAPI.Resource
{
    public class ResourceData<T>
    {
        public T Data { get; private set; }
        public ResourceData(T data)
        {
            Data = data;
        }

        public List<Link> Links { get; set; } = new List<Link> { };
    }

    public static class ResourceDataExtensions
    {
        public static ResourceData<object> AddLink(this ResourceData<object> data, Link link)
        {
            data.Links.Add(link);
            return data;
        }
    }
}
