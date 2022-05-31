import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = {} as FormGroup;
  user: User = {} as User;
  imageUpload: File = {} as File;
  imgTemp: any = null;

  constructor(private fb: FormBuilder, private userService: UserService, private fileUploadService: FileUploadService) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateProfile(this.profileForm.value).subscribe(
      (resp: any) => {
        const { name, email } = resp.user;
        this.user.name = name;
        this.user.email = email;

        Swal.fire('Saved', 'Changes were saved', 'success');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
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
    this.fileUploadService
      .updatePhoto(this.imageUpload, 'users', this.user.uid || '')
      .then((img) => {
        this.user.img = img;
        Swal.fire('Saved', 'Image updated', 'success');
      })
      .catch((err) => {
        Swal.fire('Error', "Image couldn't be uploaded", 'error');
      });
  }
}
