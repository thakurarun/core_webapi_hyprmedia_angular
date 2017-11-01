using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Newtonsoft.Json;
using NJsonSchema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;

namespace SimpleAPI.CustomUrlHelper
{
    public class Link
    {
        public string Rel { get; set; }
        public string Href { get; set; }

        public object ParamSchema { get; internal set; }
    }

    public static class UrlCreator
    {


        public static Link From<T, TResult>(
                                        string rel,
                                        Expression<Func<T, TResult>> method) where T : Controller
        {
            var methodCallExp = method.GetMethodCallExpression();
            var routeName = ResolveRouteName(methodCallExp);
            var href = routeName + methodCallExp
                                    .GetRouteValues()
                                    .ToQueryString(false);
            return new Link
            {
                Rel = rel,
                Href = href// HttpUtility.UrlEncode(url)
            };
        }

        public static Link WithParams<T>(this Link link) where T : class
        {
            var schema = Task.Run(async () => await JsonSchema4.FromTypeAsync<T>());
            link.ParamSchema = schema.Result;
            return link;
        }
        public static Link WithParams(this Link link, object from)
        {
            var jsonString = JsonConvert.SerializeObject(from);
            var schema = Task.Run(async () => await JsonSchema4.FromJsonAsync(jsonString));
            link.ParamSchema = schema.Result;
            return link;
        }

        private static string ResolveRouteName(
                                            MethodCallExpression methodCallExp)
        {
            var controller = methodCallExp
                                   .Object
                                   .Type;
            var data = controller.GetCustomAttribute(typeof(RouteAttribute)) as RouteAttribute;
            if (data == null)
                throw new Exception($"No route template defined on controller: {controller.Name}, namespace: {controller.Namespace}");
            return data.Template;
        }

        public static IDictionary<string, object> GetRouteValues(
                                                            this MethodCallExpression methodCallExpression)
        {
            if (methodCallExpression == null)
                throw new ArgumentNullException("methodCallExpression");

            var dict = methodCallExpression.Method.GetParameters()
                .Select(p => GetParameterValues(methodCallExpression, p))
                .SelectMany(d => d)
                .Where(kvp => !(kvp.Value is null))
                .ToDictionary(kvp => kvp.Key, kvp => kvp.Value);
            return dict;
        }

        public static IDictionary<string, object> GetParameterValues(
                                                                   MethodCallExpression methodCallExpression,
                                                                   ParameterInfo parameterInfo)
        {
            if (methodCallExpression == null)
                throw new ArgumentNullException("methodCallExpression");
            if (parameterInfo == null)
                throw new ArgumentNullException("parameterInfo");

            var arg = methodCallExpression.Arguments[parameterInfo.Position];
            var lambda = Expression.Lambda(arg);
            var value = lambda.Compile().DynamicInvoke();
            return new Dictionary<string, object>
            {
                { parameterInfo.Name, value }
            };
        }

        public static string ToQueryString(
                                        this IDictionary<string, object> routeValues,
                                        bool enableQueryString)
        {
            if (!routeValues.Any())
            {
                return string.Empty;
            }
            if (enableQueryString)
                return "?" + string.Join("&", routeValues
                                                    .Select(kvp =>
                                                            string.Format("{0}={1}", kvp.Key, kvp.Value)));
            return "/" + string.Join("/", routeValues
                                              .Select(kvp =>
                                                        string.Format("{1}", kvp.Key, kvp.Value)));
        }
    }

    internal static class ExpressionExtensions
    {
        internal static MethodCallExpression GetMethodCallExpression(
                                                                this LambdaExpression expression)
        {
            if (expression == null)
                throw new ArgumentNullException("expression");

            var methodCallExpression = expression.Body as MethodCallExpression;
            if (methodCallExpression == null)
            {
                throw new ArgumentException(
                    "The expression's body must be a MethodCallExpression. The code block supplied should invoke a method.\nExample: x => x.Foo().",
                    "expression");
            }

            return methodCallExpression;
        }

        public static string MemberName<T, V>(
                                        this Expression<Func<T, V>> expression)
        {
            var memberExpression = expression.Body as MemberExpression;
            if (memberExpression == null)
                throw new InvalidOperationException("Expression must be a member expression");

            return memberExpression.Member.Name;
        }

        public static T GetAttribute<T>(
                                    this ICustomAttributeProvider provider)
            where T : Attribute
        {
            var attributes = provider.GetCustomAttributes(typeof(T), true);
            return attributes.Length > 0 ? attributes[0] as T : null;
        }
    }
}

