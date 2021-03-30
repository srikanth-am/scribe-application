import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {
  langSupported: any[];

  constructor(private langService: LanguageService) { }

  ngOnInit() {
    this.langSupported = this.langService.getSupportedLanguages();
  }

  onLangSelect(event) {
    if(!event) {
      return;
    }
    this.langService.setLanguage(event.detail.value)
  }

}
