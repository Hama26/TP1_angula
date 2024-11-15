import { Component, OnInit } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ToastrService } from 'ngx-toastr';
import { LoggerService } from '../../services/logger.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent implements OnInit {
  cvs$!: Observable<Cv[]>; // Observable for async pipe
  selectedCv$!: Observable<Cv | null>; // Observable for selected CV
  date = new Date();

  constructor(
    private cvService: CvService,
    private toastr: ToastrService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.logger.logger('je suis le cvComponent');
    this.toastr.info('Bienvenue dans notre CvTech');

    // Load CVs with error handling
    this.cvs$ = this.cvService.getCvs().pipe(
      catchError((error) => {
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
        return of(this.cvService.getFakeCvs());
      })
    );

    // Listen for selected CV changes
    this.selectedCv$ = this.cvService.selectCv$;
  }
}
