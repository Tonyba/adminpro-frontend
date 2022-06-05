import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from '../../../models/user.model';

import { UserService } from 'src/app/services/user.service';
import { SearchService } from '../../../services/search.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  usersTemp: User[] = [];
  totalUsers = 0;
  from: number = 0;
  loading: boolean = true;
  public imgSubs: Subscription = {} as Subscription;

  constructor(private userService: UserService, private searchService: SearchService, private modalImageService: ModalImageService) {}

  ngOnInit(): void {
    this.getUsers();
    this.imgSubs = this.modalImageService.newImage.pipe(delay(100)).subscribe((img) => this.getUsers());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(({ users, total }) => {
      this.users = users;
      this.usersTemp = users;
      this.totalUsers = total;
      this.loading = false;
    });
  }

  changePage(value: number) {
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {
      this.from -= value;
    }

    this.getUsers();
  }

  search(term: string) {
    if (term.length === 0) {
      this.users = [...this.usersTemp];
      return;
    }
    this.searchService.search('user', term).subscribe((resp) => {
      this.users = resp || [];
    });
  }

  deleteUser(id: string) {
    if (id === this.userService.uid) {
      return Swal.fire('Error', 'You cant delete yourself', 'error');
    }

    return Swal.fire({
      title: 'Delete User?',
      text: `You will delete user ${id}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(id).subscribe((resp) => {
          Swal.fire('User Deleted', `User ${id} was deleted successfuly`, 'success');
          this.getUsers();
        });
      }
    });
  }

  changeRole(user: User) {
    this.userService.saveUser(user).subscribe((resp) => {
      console.log(resp);
    });
  }

  openModal(user: User) {
    this.modalImageService.openModal('users', user.uid!, user.img);
  }
}
