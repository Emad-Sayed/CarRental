namespace CarRental.Migrations.MyEdits
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Category_Car_Adding : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Cars",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Model = c.String(),
                        NumberOfSeats = c.Int(nullable: false),
                        price = c.Single(nullable: false),
                        State = c.Int(nullable: false),
                        Color = c.String(),
                        Car_Category_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Categories", t => t.Car_Category_ID)
                .Index(t => t.Car_Category_ID);
            
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Cars", "Car_Category_ID", "dbo.Categories");
            DropIndex("dbo.Cars", new[] { "Car_Category_ID" });
            DropTable("dbo.Categories");
            DropTable("dbo.Cars");
        }
    }
}
