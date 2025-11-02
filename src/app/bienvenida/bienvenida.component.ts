import { Component, HostListener } from '@angular/core';
import { MenuComponent } from '../components/menu/menu.component';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent {

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < window.innerHeight - 50) {
        card.classList.add('animate-slide-up');
      }
    });
  }
}
