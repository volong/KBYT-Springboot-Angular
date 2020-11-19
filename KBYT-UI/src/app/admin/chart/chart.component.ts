import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Symptom } from 'src/app/@core/models/symptom';
import { SymptomService } from 'src/app/@core/service/symptom.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  chart: string;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private symptomService: SymptomService) { }

  ngOnInit(): void {
  }



}

