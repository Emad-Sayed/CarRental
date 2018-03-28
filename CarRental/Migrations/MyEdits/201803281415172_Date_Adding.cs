namespace CarRental.Migrations.MyEdits
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Date_Adding : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Dates",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Date_ = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Dates");
        }
    }
}
