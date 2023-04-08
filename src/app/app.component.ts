import { Component, ViewChild } from '@angular/core';
import { HeicToJpegDirective } from './heic-to-jpeg.directive';
import { ImageUploadService } from './image-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private imageUploadService: ImageUploadService) {}

  selectedFiles: File[] = [];

  onFilesSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      this.selectedFiles = Array.from(fileInput.files);
    }
  }

  @ViewChild(HeicToJpegDirective, { static: false }) heicToJpegDirective: HeicToJpegDirective | undefined;
  async downloadConvertedImage(file: any) {
    if (file && this.heicToJpegDirective && this.heicToJpegDirective.convertedImageUrl) {
      const a = document.createElement('a');
      a.href = this.heicToJpegDirective.convertedImageUrl;
      a.download = file.name.replace(/\.[^.]+$/, '.jpg');
      a.click();
    }
  }

  async uploadConvertedImage(file: any) {
    if (file && this.heicToJpegDirective) {
      try {
        console.log(this.heicToJpegDirective);
        await this.imageUploadService.uploadImage(this.heicToJpegDirective.jpegBlob, file.name.replace(/\.[^.]+$/, '.jpg')).toPromise();
        console.log('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }
}
