import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { MedicService } from '../../../services/medic.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from '../../../models/hospital.model';
import { Medic } from 'src/app/models/medic.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: [],
})
export class MedicComponent implements OnInit {
  medicForm: FormGroup = {} as FormGroup;
  hospitals: Hospital[] = [];
  selectedHospital?: Hospital;
  selectedMedic?: Medic;

  constructor(
    private hospitalService: HospitalService,
    private medicService: MedicService,
    private router: Router,
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => {
      this.getMedic(id);
    });

    this.medicForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.getHospitals();

    this.medicForm.get('hospital')?.valueChanges.subscribe((hospitalId) => {
      this.selectedHospital = this.hospitals.find((h) => h.uid === hospitalId);
    });
  }

  getMedic(id: string) {
    if (id === 'new') {
      return;
    }

    this.medicService
      .getMedic(id)
      .pipe(delay(200))
      .subscribe(
        (medic) => {
          this.selectedMedic = medic;
          const {
            name,
            hospital: { _id },
          } = medic;

          this.medicForm.setValue({
            name,
            hospital: _id,
          });
        },
        (err) => {
          this.router.navigateByUrl(`/dashboard/medics`);
        }
      );
  }

  saveMedic() {
    const { name } = this.medicForm.value;

    if (this.selectedMedic && this.medicForm.valid) {
      const data = {
        ...this.medicForm.value,
        uid: this.selectedMedic.uid,
      };
      this.medicService.updateMedic(data).subscribe((resp) => {
        Swal.fire('Updated', `${name}`, 'success');
      });
    } else {
      if (this.medicForm.valid) {
        this.medicService.createMedic(this.medicForm.value).subscribe((resp: any) => {
          console.log(resp);
          Swal.fire('Created', `${name}`, 'success');
          this.router.navigateByUrl(`/dashboard/medic/${resp.medic.uid}`);
        });
      }
    }
  }

  getHospitals() {
    this.hospitalService.getHospital().subscribe((hospitals) => {
      this.hospitals = hospitals;
    });
  }
}
