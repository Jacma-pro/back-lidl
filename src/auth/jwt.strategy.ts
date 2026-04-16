import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import type { Algorithm } from 'jsonwebtoken';

export interface JwtPayload {
  sub: number;
  role: 'CLIENT' | 'OPERATOR' | 'MANAGER' | 'ADMIN';
  storeId: number | null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['HS256'] as Algorithm[], // Rejet implicite de alg:none et autres
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
    });
  }

  validate(payload: JwtPayload) {
    if (!payload?.sub || !payload?.role) {
      throw new UnauthorizedException('Token invalide');
    }

    return {
      id: payload.sub,
      role: payload.role,
      storeId: payload.storeId ?? null,
    };
  }
}
