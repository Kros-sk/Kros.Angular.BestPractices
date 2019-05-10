import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    appName$: Observable<string> = this.mainConfig.pipe(map(_ => _.appName));

    constructor(
        private http: HttpClient
    ) { }

    private get mainConfig() {
        return this.http.get<any>('./assets/configs/main.json');
    }
}
