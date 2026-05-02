namespace Mira.API.Models.DTOs
{
    public class UnitDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }

    public class CreateUnitDto
    {
        public string Name { get; set; } = string.Empty;
    }

    public class UpdateUnitDto
    {
        public string Name { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}