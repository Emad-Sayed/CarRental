namespace CarRental.Migrations.MyEdits
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RentedCars_Adding : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RentedCars",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Car_ID_ID = c.Int(),
                        End_Date_ID = c.Int(),
                        Start_Date_ID = c.Int(),
                        User_ID_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Cars", t => t.Car_ID_ID)
                .ForeignKey("dbo.Dates", t => t.End_Date_ID)
                .ForeignKey("dbo.Dates", t => t.Start_Date_ID)
                .ForeignKey("dbo.Users", t => t.User_ID_ID)
                .Index(t => t.Car_ID_ID)
                .Index(t => t.End_Date_ID)
                .Index(t => t.Start_Date_ID)
                .Index(t => t.User_ID_ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RentedCars", "User_ID_ID", "dbo.Users");
            DropForeignKey("dbo.RentedCars", "Start_Date_ID", "dbo.Dates");
            DropForeignKey("dbo.RentedCars", "End_Date_ID", "dbo.Dates");
            DropForeignKey("dbo.RentedCars", "Car_ID_ID", "dbo.Cars");
            DropIndex("dbo.RentedCars", new[] { "User_ID_ID" });
            DropIndex("dbo.RentedCars", new[] { "Start_Date_ID" });
            DropIndex("dbo.RentedCars", new[] { "End_Date_ID" });
            DropIndex("dbo.RentedCars", new[] { "Car_ID_ID" });
            DropTable("dbo.RentedCars");
        }
    }
}
