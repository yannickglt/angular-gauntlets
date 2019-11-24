# Angular Gauntlets
Add shortcuts to easily debug your Angular 2+ application

![logo](https://user-images.githubusercontent.com/1006426/36344659-faf8a79e-141d-11e8-8ae1-a4a51e26af80.png)

Angular Gauntlets helps you getting your hands dirty. 
This chrome extension makes the components and providers of your Angular application accessible on click on an element in the Chrome DevTools elements panel.

## Install
Download the extension from the Chrome Web Store:

[https://chrome.google.com/webstore/detail/angular-gauntlets/cpinnkgbfohodioinipjdhehnihbgeph](https://chrome.google.com/webstore/detail/angular-gauntlets/cpinnkgbfohodioinipjdhehnihbgeph)

## How to use
Gauntlets is light, based on `ng.probe`, loads instantly and does not need to switch to another tab of the Chrome DevTools. 

Just click on a DOM element in the DevTools elements panel, type one of the following keywords in the console and here we go!
- `$component`: click on a DOM element referring to an Angular component to access its instance and playing with it.
- `$context`: display a DOM element context, can be its parent Angular component, a `ngFor` row, etc.
- `$scope`: equals `$component` onto Angular components or `$context` onto child elements. The best alternative of [AngularJS Batarang](https://github.com/angular/batarang) for Angular.
- `$providers`: get the list of the all the providers instantiated in your Angular app and play with them.
- `$detectChanges()`: triggers Angular change detection to get your changes apply.
- `log$(obs)`: log the first value of the given observable.

**Little extra**: you can get a preview of all these info in the `Angular` tab of your DevTools elements panel. Switching between elements will refresh the data immediately.

## Demo
### Playing with components 
![component](https://user-images.githubusercontent.com/1006426/36467153-c3910a04-16dd-11e8-9228-6338568d7299.gif)

### Playing with providers
![providers](https://user-images.githubusercontent.com/1006426/36467178-e1c1d102-16dd-11e8-9ad3-aad11584185d.gif)

### State preview
![panel](https://user-images.githubusercontent.com/1006426/36344674-4ef7daa4-141e-11e8-88de-9c1edfa9abd7.png)

## License 
MIT
