import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is on the way.')
    // you can modify requests here.
    console.log(req);
    const modifiedReq = req.clone({
      headers: req.headers.append('Manong', 'Badong')
    });
    console.log(modifiedReq);
    return next.handle(modifiedReq);

    // you can also use something to modify the response but better by careful. using .pipe .map . tap
  }
}