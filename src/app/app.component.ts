import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ring-of-fire';
  loading: boolean = false;
  initialLoadCompleted: boolean = false;

  constructor() {
    this.loadFromLocalStorage();

    if (!this.initialLoadCompleted) {
      this.loading = true;
      this.preloadImages();

      setTimeout(() => {
        this.initialLoadCompleted = true;
        localStorage.setItem('initialLoadCompleted', 'true');
        this.loading = false;
      }, 5000)
    }

  }

  // ######################################################################### Loading Screen - END

  /**
   * Help function to collect all preloaders
   */
  preloadImages() {
    this.preloadImage('./../assets/img/action_bg/active_bg.svg');
    this.preloadImage('./../assets/img/action_bg/inactive_bg.svg');
    this.preloadImage('./../assets/img/background/cherries_bg.svg');
    this.preloadImage('./../assets/img/background/christmas_bg.svg');
    this.preloadImage('./../assets/img/background/halloween_bg.svg');
    this.preloadImage('./../assets/img/background/stars_bg.svg');
    this.preloadImage('./../assets/img/background/wood_bg.svg');
    this.preloadImage('./../assets/img/players/bee.svg');
    this.preloadImage('./../assets/img/players/penguin.svg');
    this.preloadImage('./../assets/img/players/standard_avatar.svg');
    this.preloadImage('./../assets/img/players/woman_blue.svg');
    this.preloadImage('./../assets/img/players/woman_pink.svg');
    this.preloadImage('./../assets/img/start_screen/wall.png');

  }

  /**
   * Creates a new object for the passed image
   * @param url url The path of the single image
   */
  preloadImage(url: string) {
    const img = new Image();
    img.src = url;
  }

  /**
   * Loads data from the local storage
   */
  loadFromLocalStorage() {
    let itemAsString = localStorage.getItem('initialLoadCompleted');

    if (itemAsString === 'true') {
      this.initialLoadCompleted = true;
    } else {
      this.initialLoadCompleted = false;
    }
  }

}
