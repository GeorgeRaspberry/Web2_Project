using Microsoft.EntityFrameworkCore.Migrations;

namespace projectBackend.Migrations
{
    public partial class @as : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserID",
                table: "RideCompanies",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserID",
                table: "FlightCompanies",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserID",
                table: "RideCompanies");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "FlightCompanies");
        }
    }
}
