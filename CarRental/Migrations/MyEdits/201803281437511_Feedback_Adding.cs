namespace CarRental.Migrations.MyEdits
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Feedback_Adding : DbMigration
    {
        public override void Up()
        {
            
            CreateTable(
                "dbo.Feedbacks",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Car_Quality = c.Int(nullable: false),
                        System_Quality = c.Int(nullable: false),
                        Car_Rated_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Cars", t => t.Car_Rated_ID)
                .Index(t => t.Car_Rated_ID);
            
            DropTable("dbo.Emails");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Emails",
                c => new
                    {
                        iD = c.Int(nullable: false, identity: true),
                        Content = c.String(),
                        Email_Date_ID = c.Int(),
                        From_ID = c.Int(),
                        To_ID = c.Int(),
                    })
                .PrimaryKey(t => t.iD);
            
            DropForeignKey("dbo.Feedbacks", "Car_Rated_ID", "dbo.Cars");
            DropForeignKey("dbo.Emails", "To_ID", "dbo.Users");
            DropForeignKey("dbo.Emails", "From_ID", "dbo.Users");
            DropForeignKey("dbo.Emails", "Email_Date_ID", "dbo.Dates");
            DropIndex("dbo.Feedbacks", new[] { "Car_Rated_ID" });
            DropIndex("dbo.Emails", new[] { "To_ID" });
            DropIndex("dbo.Emails", new[] { "From_ID" });
            DropIndex("dbo.Emails", new[] { "Email_Date_ID" });
            DropTable("dbo.Feedbacks");
            DropTable("dbo.Emails");
            CreateIndex("dbo.Emails", "To_ID");
            CreateIndex("dbo.Emails", "From_ID");
            CreateIndex("dbo.Emails", "Email_Date_ID");
            AddForeignKey("dbo.Emails", "To_ID", "dbo.Users", "ID");
            AddForeignKey("dbo.Emails", "From_ID", "dbo.Users", "ID");
            AddForeignKey("dbo.Emails", "Email_Date_ID", "dbo.Dates", "ID");
        }
    }
}
