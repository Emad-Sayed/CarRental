namespace CarRental.Migrations.MyEdits
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DeleteDates : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.RentedCars", "End_Date_ID", "dbo.Dates");
            DropForeignKey("dbo.RentedCars", "Start_Date_ID", "dbo.Dates");
            DropForeignKey("dbo.RentedCars", "User_ID_ID", "dbo.Users");
            DropIndex("dbo.RentedCars", new[] { "End_Date_ID" });
            DropIndex("dbo.RentedCars", new[] { "Start_Date_ID" });
            DropIndex("dbo.RentedCars", new[] { "User_ID_ID" });
            AddColumn("dbo.RentedCars", "Start_Date", c => c.DateTime(nullable: false));
            AddColumn("dbo.RentedCars", "End_Date", c => c.DateTime(nullable: false));
            AddColumn("dbo.RentedCars", "User_ID", c => c.Int());
            CreateIndex("dbo.RentedCars", "User_ID");
            AddForeignKey("dbo.RentedCars", "User_ID", "dbo.Users", "ID");
            DropColumn("dbo.RentedCars", "End_Date_ID");
            DropColumn("dbo.RentedCars", "Start_Date_ID");
            DropColumn("dbo.RentedCars", "User_ID_ID");
            DropTable("dbo.Dates");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Dates",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Date_ = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            AddColumn("dbo.RentedCars", "User_ID_ID", c => c.Int());
            AddColumn("dbo.RentedCars", "Start_Date_ID", c => c.Int());
            AddColumn("dbo.RentedCars", "End_Date_ID", c => c.Int());
            AddColumn("dbo.Emails", "Email_Date_ID", c => c.Int());
            DropForeignKey("dbo.RentedCars", "User_ID", "dbo.Users");
            DropIndex("dbo.RentedCars", new[] { "User_ID" });
            DropColumn("dbo.RentedCars", "User_ID");
            DropColumn("dbo.RentedCars", "End_Date");
            DropColumn("dbo.RentedCars", "Start_Date");
            DropColumn("dbo.Emails", "Email_Date");
            CreateIndex("dbo.RentedCars", "User_ID_ID");
            CreateIndex("dbo.RentedCars", "Start_Date_ID");
            CreateIndex("dbo.RentedCars", "End_Date_ID");
            CreateIndex("dbo.Emails", "Email_Date_ID");
            AddForeignKey("dbo.RentedCars", "User_ID_ID", "dbo.Users", "ID");
            AddForeignKey("dbo.RentedCars", "Start_Date_ID", "dbo.Dates", "ID");
            AddForeignKey("dbo.RentedCars", "End_Date_ID", "dbo.Dates", "ID");
            AddForeignKey("dbo.Emails", "Email_Date_ID", "dbo.Dates", "ID");
        }
    }
}
