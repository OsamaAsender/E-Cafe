namespace OA.E_Cafe.Dtos.Pages
{
    public class PagedListDto<T>
    {
        public List<T> Items { get; set; } = [];
        public int TotalItems { get; set; }
    }
}
