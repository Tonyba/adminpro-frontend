import { Component, OnInit } from '@angular/core';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [],
})
export class ModalImageComponent implements OnInit {
  imageUpload: File = {} as File;
  imgTemp: any = null;

  constructor(public modalImageService: ModalImageService, private fileUploadService: FileUploadService) {}

  ngOnInit(): void {}

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
  }

  changeImage(event: any) {
    this.imageUpload = event.target.files[0];

    if (!this.imageUpload) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imageUpload);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };

    return;
  }

  uploadImage() {
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService
      .updatePhoto(this.imageUpload, type, id || '')
      .then((img: any) => {
        Swal.fire('Saved', 'Image uploaded', 'success');
        this.modalImageService.newImage.emit(img);
        this.imgTemp = null;
        this.closeModal();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Error', 'Error uploading image', 'error');
      });
  }
}
