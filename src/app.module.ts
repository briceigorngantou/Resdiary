import { Module } from "@nestjs/common";
import { ResdiaryModule } from "./resdiary/resdiary.module";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { CacheModule, CacheInterceptor } from "@nestjs/cache-manager";

@Module({
  imports: [
    CacheModule.register(),
    ResdiaryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ResdiaryModule,
  ],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: CacheInterceptor }],
})
export class AppModule {}
