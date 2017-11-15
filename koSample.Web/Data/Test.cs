using System;

namespace koSample.Web.Data
{
    public partial class Test : EntityBase
    {
        public string Title { get; set; }
        public string Content { set; get; }
        public DateTime? UpdateTime { set; get; }
    }

    public class TestConfiguration : EntityTypeConfigurationBase<Test>
    {
        public TestConfiguration()
        {
            ToTable("Tests");
            Property(o => o.Title).HasMaxLength(50);
            Property(o => o.Content);
        }
    }
}
