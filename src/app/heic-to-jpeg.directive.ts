import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import heic2any from 'heic2any';

@Directive({
  selector: '[appHeicToJpeg]',
})
export class HeicToJpegDirective {
  @Input('appHeicToJpeg') set heicFile(file: File | null) {
    if (file) {
      this.convertHeicToJpeg(file);
    }
  }
  @Output() conversionError = new EventEmitter<Error>();

  convertedImageUrl: string | null = null;
  jpegBlob: Blob | any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private async convertHeicToJpeg(heicFile: File) {
    try {
      const result = await heic2any({ blob: heicFile, toType: 'image/jpeg', quality: 0.8 });
      this.jpegBlob = Array.isArray(result) ? result[0] : result;
      this.convertedImageUrl = URL.createObjectURL(this.jpegBlob);
      this.renderer.setAttribute(this.el.nativeElement, 'src', this.convertedImageUrl);
    } catch (error) {
      console.error('Error converting HEIC to JPEG:', error);
    }
  }
}
