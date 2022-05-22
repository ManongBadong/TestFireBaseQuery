import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is on the way.')
    // you can modify requests here.
    const modifiedReq = req.clone({
      headers: req.headers.append('Manong', 'Badong')
    });
    return next.handle(modifiedReq);
  }
}