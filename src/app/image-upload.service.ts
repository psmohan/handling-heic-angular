import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private apiUrl = 'https://fileupload.free.beeceptor.com/upload';
 
  constructor(private http: HttpClient) {}
 
  uploadImage(image: Blob, imageName: string) {
    const formData = new FormData();
    formData.append('image', image, imageName);
 
    return this.http.post(this.apiUrl, formData);
  }
}