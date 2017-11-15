using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace koSample.Web.Repositories
{

    using Data;
    public class TestRespository : RespositoryBase<Test>, ITestRespository
    {
        public TestRespository(DbContext dbContext)
            : base(dbContext)
        { }
    }
}