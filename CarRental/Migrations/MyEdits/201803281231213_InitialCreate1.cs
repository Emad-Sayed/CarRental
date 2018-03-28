namespace CarRental.Migrations.MyEdits
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Password", c => c.String());
            AddColumn("dbo.Users", "CreditCardNumber", c => c.String());
            AddColumn("dbo.Users", "Phone", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "Phone");
            DropColumn("dbo.Users", "CreditCardNumber");
            DropColumn("dbo.Users", "Password");
        }
    }
}
