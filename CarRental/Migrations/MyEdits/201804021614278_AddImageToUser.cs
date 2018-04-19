namespace CarRental.Migrations.MyEdits
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddImageToUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "User_Image", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "User_Image");
        }
    }
}
