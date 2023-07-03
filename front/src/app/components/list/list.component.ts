import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatListModule, MatDividerModule, MatIconModule],
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
