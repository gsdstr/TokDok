import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private readonly API_URL = 'http://localhost:8080/api/Tags';
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAllTag(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(this.API_URL);
  }

  getTagById(id: number): Observable<Tag> {
    return this.httpClient.get<Tag>(this.API_URL + `?${id}`);
  }

  createTag(body: Tag): Observable<Tag> {
    return this.httpClient.post<Tag>(this.API_URL, body);
  }

  updateTag(id: number, body: Tag): Observable<Tag> {
    return this.httpClient.put<Tag>(this.API_URL + `/${id}`, body);
  }

  patchTag(id: number, body: Tag): Observable<Tag> {
    return this.httpClient.patch<Tag>(this.API_URL + `/${id}`, body);
  }

  deleteTag(id: number): Observable<Object> {
    return this.httpClient.delete<Object>(this.API_URL + `/${id}`);
  }

}
