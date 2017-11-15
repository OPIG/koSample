using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace koSample.Web.Data
{
    public class EntityTypeConfigurationBase<T> : EntityTypeConfiguration<T> where T : EntityBase
    {
        public EntityTypeConfigurationBase()
        {
            HasKey(o => o.Id).Property(o => o.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}