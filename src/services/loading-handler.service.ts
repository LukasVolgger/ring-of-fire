import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingHandlerService {
  loading: boolean = false;
  initialLoadCompleted: boolean = false;

  constructor() { }

  /**
   * Help function to collect all preloaders
   */
  preloadImages() {
    this.preloadImage('./../assets/img/action_bg/active_bg.svg');
    this.preloadImage('./../assets/img/action_bg/inactive_bg.svg');
    this.preloadImage('./../assets/img/background/cherries_bg.svg');
    this.preloadImage('./../assets/img/background/christmas_bg.svg');
    this.preloadImage('./../assets/img/background/floral_bg.svg');
    this.preloadImage('./../assets/img/background/halloween_bg.svg');
    this.preloadImage('./../assets/img/background/neon_bg.svg');
    this.preloadImage('./../assets/img/background/stars_bg.svg');
    this.preloadImage('./../assets/img/background/thanksgiving_bg.svg');
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
