namespace CarRental.Migrations.MyEdits
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCategpryDescriptionAndCarAdvantages : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Cars", "Advantages", c => c.String(nullable: false));
            AddColumn("dbo.Categories", "Description", c => c.String());
            AlterColumn("dbo.Users", "Fname", c => c.String(nullable: false));
            AlterColumn("dbo.Users", "Lname", c => c.String(nullable: false));
            AlterColumn("dbo.Users", "Email", c => c.String(nullable: false));
            AlterColumn("dbo.Users", "Password", c => c.String(nullable: false));
            AlterColumn("dbo.Users", "CreditCardNumber", c => c.String(nullable: false));
            AlterColumn("dbo.Users", "Phone", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Users", "Phone", c => c.String());
            AlterColumn("dbo.Users", "CreditCardNumber", c => c.String());
            AlterColumn("dbo.Users", "Password", c => c.String());
            AlterColumn("dbo.Users", "Email", c => c.String());
            AlterColumn("dbo.Users", "Lname", c => c.String());
            AlterColumn("dbo.Users", "Fname", c => c.String());
            DropColumn("dbo.Categories", "Description");
            DropColumn("dbo.Cars", "Advantages");
        }
    }
}
