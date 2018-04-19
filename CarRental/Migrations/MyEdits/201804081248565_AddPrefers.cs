namespace CarRental.Migrations.MyEdits
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddPrefers : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Prefers",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        category_ID = c.Int(),
                        user_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Categories", t => t.category_ID)
                .ForeignKey("dbo.Users", t => t.user_ID)
                .Index(t => t.category_ID)
                .Index(t => t.user_ID);
            
        
        }
        
        public override void Down()
        {
           
            DropIndex("dbo.Prefers", new[] { "user_ID" });
            DropIndex("dbo.Prefers", new[] { "category_ID" });
            AlterColumn("dbo.Cars", "Car_Category_ID", c => c.Int(nullable: false));
            DropTable("dbo.Prefers");
        }
    }
}
