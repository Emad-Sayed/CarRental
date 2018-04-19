namespace CarRental.Migrations.MyEdits
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddDataAnnotaion1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Cars", "Car_Category_ID", "dbo.Categories");
            DropIndex("dbo.Cars", new[] { "Car_Category_ID" });
            AlterColumn("dbo.Cars", "Model", c => c.String(nullable: false));
            AlterColumn("dbo.Cars", "Image", c => c.String(nullable: false));
            AlterColumn("dbo.Cars", "Car_Category_ID", c => c.Int(nullable: false));
            CreateIndex("dbo.Cars", "Car_Category_ID");
            AddForeignKey("dbo.Cars", "Car_Category_ID", "dbo.Categories", "ID", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Cars", "Car_Category_ID", "dbo.Categories");
            DropIndex("dbo.Cars", new[] { "Car_Category_ID" });
            AlterColumn("dbo.Cars", "Car_Category_ID", c => c.Int());
            AlterColumn("dbo.Cars", "Image", c => c.String());
            AlterColumn("dbo.Cars", "Model", c => c.String());
            CreateIndex("dbo.Cars", "Car_Category_ID");
            AddForeignKey("dbo.Cars", "Car_Category_ID", "dbo.Categories", "ID");
        }
    }
}
