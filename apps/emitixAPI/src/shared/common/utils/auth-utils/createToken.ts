import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/core/auth/application/constants';
import type { ITokenPayload } from '../../interfaces/ITokenPayload';

export async function CreateToken(payload: ITokenPayload) {
  const jwt = new JwtService({
    secret: jwtConstants.secret,
  });
  return await jwt.signAsync(payload, { expiresIn: '1h' });
}
