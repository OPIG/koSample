using System.Data.Entity;
using System.Data.Entity.Migrations;

namespace koSample.Web.Data
{
    public class koSampleDbContext : DbContext
    {
        public koSampleDbContext() : base("name=koSampleDbContext")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<koSampleDbContext, koConfiguration>());
        }
        public DbSet<Test> Tests { set; get; }
        public static koSampleDbContext Create()
        {
            return new koSampleDbContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.AddFromAssembly(typeof(koSampleDbContext).Assembly);
        }
    }

    internal class koConfiguration : DbMigrationsConfiguration<koSampleDbContext>
    {
        public koConfiguration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }
    }
}