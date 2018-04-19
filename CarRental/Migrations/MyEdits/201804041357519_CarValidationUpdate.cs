namespace CarRental.Migrations.MyEdits
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CarValidationUpdate : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Cars", "Advantages", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Cars", "Advantages", c => c.String(nullable: false));
        }
    }
}
