import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/users?email=${email}&password=${password}`).pipe(
      map(users => {
        if (!users.length) throw new Error('Invalid credentials');
        return users[0];
      }),
      tap(user => {
        localStorage.setItem('token', `fake-jwt-${user.id}`);
        this.loggedIn.next(true);
      })
    );
  }

  get isLoggedIn(): boolean {
    return this.loggedIn.value;
  }
}