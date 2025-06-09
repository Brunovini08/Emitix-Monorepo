import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/core/auth/application/constants';
import type { ITokenPayload } from '../../interfaces/ITokenPayload';

export async function RefreshToken(payload: ITokenPayload) {
  const jwt = new JwtService({
    secret: jwtConstants.secret,
  });
  return await jwt.signAsync(payload, { expiresIn: '7d' });
}
