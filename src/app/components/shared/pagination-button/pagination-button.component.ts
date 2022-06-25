import { Component, Input } from '@angular/core';
import { ChangeDirection } from 'src/app/models/pagination.model';

@Component({
  selector: 'app-pagination-button',
  templateUrl: './pagination-button.component.html',
  styleUrls: ['./pagination-button.component.scss']
})
export class PaginationButtonComponent {
  @Input() public buttonType: ChangeDirection;
}
