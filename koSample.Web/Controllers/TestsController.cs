using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using koSample.Web.Services;
using koSample.Web.Data;

namespace koSample.Web.Controllers
{
    public class TestsController : ApiController
    {
        private ITestService TestService { get; set; }
        public TestsController(ITestService testService)
        {
            TestService = testService;
        }
        // GET: api/Test
        public IEnumerable<Test> Get()
        {
            return TestService.List();
        }

        // GET: api/Test/5
        public Test Get(int id)
        {
            return TestService.Get(id);
        }

        // POST: api/Test
        public Test Post([FromBody]Test value)
        {
            value.UpdateTime = DateTime.Now;
            TestService.Add(value);
            return value;
        }

        // PUT: api/Test/5
        public Test Put(int id, [FromBody]Test value)
        {
            value.Id = id;
            value.UpdateTime = DateTime.Now;
            TestService.Update(value);
            return value;
        }

        // DELETE: api/Test/5
        public void Delete(int id)
        {
            TestService.Delete(id);
        }
    }
}
