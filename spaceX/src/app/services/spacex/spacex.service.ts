import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, map, Observable, switchMap} from "rxjs";
import {enviroment} from "../../../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class SpacexService {

  constructor(private http: HttpClient) {
  }

  getLaunchpads(): Observable<any> {
    return this.http.get(`${enviroment.baseUrl}/launchpads`);
  }

  getLaunchesById(launchpadId: string): Observable<any> {
    const queryPayload = {
      query: {
        launchpad: launchpadId
      }
    };
    return this.http.post<any>(`${enviroment.baseUrl}/launches/query`, queryPayload);
  }

  getLaunchpadsWithLaunches(): Observable<any> {
    return this.getLaunchpads().pipe(
      switchMap((launchpads: any[]) => {
        const launchpadRequests = launchpads.map(launchpad =>
          this.getLaunchesById(launchpad.id).pipe(
            map(response => ({
              ...launchpad,
              launches: response.docs
            }))
          )
        );
        return forkJoin(launchpadRequests);
      })
    );
  }

}
