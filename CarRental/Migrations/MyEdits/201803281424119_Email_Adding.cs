namespace CarRental.Migrations.MyEdits
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Email_Adding : DbMigration
    {
        public override void Up()
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
                .PrimaryKey(t => t.iD)
                .ForeignKey("dbo.Dates", t => t.Email_Date_ID)
                .ForeignKey("dbo.Users", t => t.From_ID)
                .ForeignKey("dbo.Users", t => t.To_ID)
                .Index(t => t.Email_Date_ID)
                .Index(t => t.From_ID)
                .Index(t => t.To_ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Emails", "To_ID", "dbo.Users");
            DropForeignKey("dbo.Emails", "From_ID", "dbo.Users");
            DropForeignKey("dbo.Emails", "Email_Date_ID", "dbo.Dates");
            DropIndex("dbo.Emails", new[] { "To_ID" });
            DropIndex("dbo.Emails", new[] { "From_ID" });
            DropIndex("dbo.Emails", new[] { "Email_Date_ID" });
            DropTable("dbo.Emails");
        }
    }
}
