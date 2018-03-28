namespace CarRental.Migrations.MyEdits
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Fname = c.String(),
                        Lname = c.String(),
                        Email = c.String(),
                        Block = c.Int(nullable: false),
                        Type_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.UserTypes", t => t.Type_ID)
                .Index(t => t.Type_ID);
            
            CreateTable(
                "dbo.UserTypes",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Users", "Type_ID", "dbo.UserTypes");
            DropIndex("dbo.Users", new[] { "Type_ID" });
            DropTable("dbo.UserTypes");
            DropTable("dbo.Users");
        }
    }
}
