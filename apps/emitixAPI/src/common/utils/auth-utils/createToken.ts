import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { ITokenPayload } from 'src/common/interfaces/ITokenPayload';

export async function CreateToken(payload: ITokenPayload) {
  const jwt = new JwtService({
    secret: jwtConstants.secret,
  });
  return await jwt.signAsync(payload, { expiresIn: '1h' });
}
