namespace CarRental.Migrations.MyEdits
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateRentedCar : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.RentedCars", "Car_ID_ID", "dbo.Cars");
            DropIndex("dbo.RentedCars", new[] { "Car_ID_ID" });
            AddColumn("dbo.RentedCars", "Car_ID", c => c.Int());
            CreateIndex("dbo.RentedCars", "Car_ID");
            AddForeignKey("dbo.RentedCars", "Car_ID", "dbo.Cars", "ID");
            DropColumn("dbo.RentedCars", "Car_ID_ID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RentedCars", "Car_ID_ID", c => c.Int());
            DropForeignKey("dbo.RentedCars", "Car_ID", "dbo.Cars");
            DropIndex("dbo.RentedCars", new[] { "Car_ID" });
            DropColumn("dbo.RentedCars", "Car_ID");
            CreateIndex("dbo.RentedCars", "Car_ID_ID");
            AddForeignKey("dbo.RentedCars", "Car_ID_ID", "dbo.Cars", "ID");
        }
    }
}
