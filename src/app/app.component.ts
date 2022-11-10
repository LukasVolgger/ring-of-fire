import { Component } from '@angular/core';
import { LoadingHandlerService } from 'src/services/loading-handler.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ring-of-fire';

  constructor(public loader: LoadingHandlerService) {
    this.loader.loadFromLocalStorage();

    if (!this.loader.initialLoadCompleted) {
      this.loader.loading = true;
      this.loader.preloadImages();

      setTimeout(() => {
        this.loader.initialLoadCompleted = true;
        localStorage.setItem('initialLoadCompleted', 'true');
        this.loader.loading = false;
      }, 5000)
    }

  }

}
