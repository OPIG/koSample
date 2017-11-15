using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using koSample.Web.Services;
using koSample.Web.Data;
using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;
using System.Data.Entity;
using koSample.Web.Repositories;

namespace koSample.Web
{
    public class AutofacConfig
    {
        public static void Register()
        {
            var builder = new ContainerBuilder();
            RegisterTypes(builder);
            // Get your HttpConfiguration.
            var config = GlobalConfiguration.Configuration;

            // Register your Web API controllers.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // OPTIONAL: Register the Autofac filter provider.
            builder.RegisterWebApiFilterProvider(config);

            // OPTIONAL: Register the Autofac model binder provider.
            builder.RegisterWebApiModelBinderProvider();

            // Set the dependency resolver to be Autofac.
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        public static void RegisterTypes(ContainerBuilder builder)
        {
            builder.RegisterType<koSampleDbContext>().As<DbContext>();
            builder.RegisterType<TestRespository>().As<ITestRespository>();
            builder.RegisterType<TestService>().As<ITestService>();
        }
    }
}