export interface CreateUpdateProduct {
    id : number ,
    name :string ,
    description: string ,
    barCode : string,
    rating : number,
    price : number,
    categoryId : string
}


// public int Id { get; set; }
// public required string Name { get; set; }
// public required string Description { get; set; }

// public string? BarCode { get; set; }
// public int Rating { get; set; } = 0;   // default value = 0


// [Column(TypeName = "decimal(4,2)")]
// public decimal Price { get; set; }

// public string CategoryId{ get; set; }