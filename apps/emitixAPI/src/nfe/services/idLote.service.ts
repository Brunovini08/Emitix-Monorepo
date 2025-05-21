import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class IdLoteService {
  constructor(private redis: RedisService) {}
  private readonly TTL_SECONDS = 60 * 60 * 24;

  async generateId(softwareHouseId: string): Promise<string> {
    const cacheKeyLote = `lote:id:${softwareHouseId}`;
    const exists = await this.redis.exists(cacheKeyLote);
    if (!exists) await this.redis.expire(cacheKeyLote, this.TTL_SECONDS);
    const newValue = await this.redis.incr(cacheKeyLote);

    return newValue.toString().padStart(15, '0');
  }

  async generateIdEvent(softwareHouseId: string): Promise<string> {
    const cacheKeyLote = `lote:id:event:${softwareHouseId}`;
    const exists = await this.redis.exists(cacheKeyLote);
    if (!exists) await this.redis.expire(cacheKeyLote, this.TTL_SECONDS);
    const newValue = await this.redis.incr(cacheKeyLote);

    return newValue.toString().padStart(15, '0');
  }
}
