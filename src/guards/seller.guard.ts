import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class SellerGuard implements CanActivate {
  constructor() {}

  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    
    if (user?.seller) {
      return true;
    }
    throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }
}