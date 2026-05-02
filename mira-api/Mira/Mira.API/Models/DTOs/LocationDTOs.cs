namespace Mira.API.Models.DTOs
{
    public class LocationDto
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Remark { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }

    public class CreateLocationDto
    {
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Remark { get; set; } = string.Empty;
    }

    public class UpdateLocationDto
    {
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Remark { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}