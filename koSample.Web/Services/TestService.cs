namespace koSample.Web.Services
{
    using Data;
    using Repositories;
    public class TestService : ServiceBase<Test>, ITestService
    {
        public TestService(ITestRespository respository) : base(respository)
        {

        }
    }
}