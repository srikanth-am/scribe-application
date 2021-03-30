import { tokenName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';

  constructor(private translate: TranslateService) {
    const browserLang = translate.getBrowserLang();
    //translate.use('ta');
    translate.use(browserLang.match(/en|ta/) ? browserLang : 'ta');
  }

  getSupportedLanguages() {
    return [
      {text: 'English', value: 'en'},
      {text: 'தமிழ்', value: 'ta'},
    ];
  }

  setLanguage(lang) {
    this.translate.use(lang);
    this.selected = lang;
  }
}
