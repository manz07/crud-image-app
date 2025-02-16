import { Routes } from '@angular/router';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { ImageGridComponent } from './components/image-grid/image-grid.component';

export const routes: Routes = [
    { path: '', redirectTo: 'gallery', pathMatch: 'full' }, 
    { path: 'gallery', component: ImageGalleryComponent },
    { path: 'upload', component: ImageGridComponent }
];
