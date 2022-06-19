import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medic } from 'src/app/models/medic.model';
import { MedicService } from 'src/app/services/medic.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SearchService } from '../../../services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: [],
})
export class MedicsComponent implements OnInit, OnDestroy {
  medics: Medic[] = [];
  loading: boolean = true;
  imgSubs: Subscription = {} as Subscription;

  constructor(
    private medicService: MedicService,
    private modalImageService: ModalImageService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.getMedics();
    this.imgSubs = this.modalImageService.newImage.pipe(delay(1500)).subscribe((img) => {
      this.getMedics();
    });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  getMedics() {
    this.loading = true;

    this.medicService.getMedics().subscribe((medics: Medic[]) => {
      this.medics = medics;
      this.loading = false;
    });
  }

  openModal(medic: Medic) {
    this.modalImageService.openModal('medics', medic.uid!, medic.img);
  }

  search(term: string) {
    if (term.length === 0) {
      return this.getMedics();
    }
    this.searchService.search('medic', term).subscribe((resp) => {
      this.medics = resp || [];
    });
  }

  deleteMedic(medic: Medic) {
    Swal.fire({
      title: 'Delete Medic?',
      text: `Medic ${medic.name} will be deleted`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.value) {
        this.medicService.deleteMedic(medic.uid!).subscribe((resp) => {
          this.getMedics();
          Swal.fire('Medic deleted', `${medic.name} was deleted`, 'success');
        });
      }
    });
  }
}
