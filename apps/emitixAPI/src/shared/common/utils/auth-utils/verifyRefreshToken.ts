import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/core/auth/application/constants';

export async function verifyRefreshToken(token: string) {
  const jwt = new JwtService({
    secret: jwtConstants.secret,
  });
  return await jwt.verifyAsync(token);
}
