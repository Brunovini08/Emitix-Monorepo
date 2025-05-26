import {
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';  
import * as Valkey from 'iovalkey'
import { env } from 'process';
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Valkey.Redis;
  onModuleInit() {
    this.client = new Valkey.Redis({
      host: env.REDIS_HOST,
      port: parseInt(env.REDIS_PORT || '6379', 10),
    });
  }

  onModuleDestroy() {
    this.client.quit();
  }

  async set(key: string, otp: string, ttlInSeconds: number): Promise<void> {
    await this.client.set(key, otp, 'EX', ttlInSeconds);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async delete(key: string): Promise<number> {
    return this.client.del(key);
  }

  async incr(key: string): Promise<number> {
    return this.client.incr(key);
  }

  async expire(key: string, ttl: number): Promise<number> {
    return this.client.expire(key, ttl);
  }

  async exists(key: string): Promise<number> {
    return this.client.exists(key);
  }
}
