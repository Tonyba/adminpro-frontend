import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  hospitals: Hospital[] = [];
  loading: boolean = true;
  private imgSubs: Subscription = {} as Subscription;
  hospitalsTemp: Hospital[] = [];

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.getHospitals();

    this.imgSubs = this.modalImageService.newImage.pipe(delay(200)).subscribe((img) => {
      console.log('pas');
      this.getHospitals();
    });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  getHospitals() {
    this.loading = true;

    this.hospitalService.getHospital().subscribe((hospitals) => {
      this.hospitals = hospitals;
      this.hospitalsTemp = hospitals;
      this.loading = false;
    });
  }

  updateHospital(id: string, name: string) {
    this.hospitalService.updateHospital(id, name).subscribe((resp) => {
      Swal.fire('Updated', name, 'success');
    });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital.uid!).subscribe((resp) => {
      this.getHospitals();
      Swal.fire('Deleted', hospital.name, 'success');
    });
  }

  search(term: string) {
    if (term.length === 0) {
      this.hospitals = [...this.hospitalsTemp];
      return;
    }
    this.searchService.search('hospital', term).subscribe((resp) => {
      this.hospitals = resp || [];
    });
  }

  async openSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create Hospital',
      text: 'Enter new Hospital Name',
      input: 'text',
      inputPlaceholder: 'Hospital Name',
    });

    if (value!.trim().length > 0) {
      this.hospitalService.createHospital(value!).subscribe((resp: any) => {
        this.hospitals.push(resp.hospital);
      });
    }
  }

  openModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital.uid!, hospital.img);
  }
}
