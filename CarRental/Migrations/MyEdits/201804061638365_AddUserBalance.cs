namespace CarRental.Migrations.MyEdits
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUserBalance : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Pendings",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Star_Date = c.DateTime(nullable: false),
                        End_Date = c.DateTime(nullable: false),
                        End_Pending = c.DateTime(nullable: false),
                        car_ID = c.Int(nullable: false),
                        user_ID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Cars", t => t.car_ID, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.user_ID, cascadeDelete: true)
                .Index(t => t.car_ID)
                .Index(t => t.user_ID);
            
            AddColumn("dbo.Users", "Balance", c => c.Single(nullable: false));
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Pendings", "user_ID", "dbo.Users");
            DropForeignKey("dbo.Pendings", "car_ID", "dbo.Cars");
            DropIndex("dbo.Pendings", new[] { "user_ID" });
            DropIndex("dbo.Pendings", new[] { "car_ID" });
            DropColumn("dbo.Users", "Balance");
            DropTable("dbo.Pendings");
        }
    }
}
