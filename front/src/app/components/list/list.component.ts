import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class ListComponent {
  @Input() name: string = '';
  @Input() url: string = '';
  @Input() description: string = '';
  @Input() date: string = '';
  @Input() coverImage: string | Array<any> = '';

  goToUrl() {
    window.open(this.url, '_blank');
  }
}
