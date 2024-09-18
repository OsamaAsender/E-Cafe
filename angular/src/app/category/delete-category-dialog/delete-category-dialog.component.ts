import { Category } from '../../models/categories/category.model';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrl: './delete-category-dialog.component.css'
})
export class DeleteCategoryDialogComponent {
  constructor(
     dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public category: Category
  ){}
}
