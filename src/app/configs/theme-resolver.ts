import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ThemeService } from '../services/theme.service';

@Injectable({ providedIn: 'root' })
export class ThemeResolver implements Resolve<boolean> {
  constructor(private themeService: ThemeService) {}

  resolve(): Observable<boolean> {
    return this.themeService.isDark$.pipe(take(1));
  }
}
