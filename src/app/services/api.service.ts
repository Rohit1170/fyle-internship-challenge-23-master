import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 

  getRepos(githubUsername: string, searchParam: URLSearchParams) {
    const url = `https://api.github.com/users/${githubUsername}/repos`;
    let params = new HttpParams();
  
    searchParam.forEach((value, key) => {
      params = params.set(key, value);
    });
  
    return this.httpClient.get(url, { params });
}
}
