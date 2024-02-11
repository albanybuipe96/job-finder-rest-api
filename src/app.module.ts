import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/entities/user.entity'
const cookieSession = require('cookie-session')
import { ConfigModule, ConfigService } from '@nestjs/config'
import { COOKIE_SESSION_SECRET, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USERNAME } from './constants/config.constants'
import { JobsModule } from './jobs/jobs.module'
import { LoggerModule } from 'nestjs-pino'
import { Job } from './jobs/entities/job.entity'

@Module({
  imports: [
    UsersModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          }
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>(DB_HOST),
          port: config.get<number>(DB_PORT),
          username: config.get<string>(DB_USERNAME),
          password: config.get<string>(DB_PASSWORD),
          database: config.get<string>(DB_NAME),
          entities: [User, Job],
          synchronize: true,
          logging: true,
          autoLoadEntities: true,
        }
      }
    }),
    JobsModule
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {
  constructor(private configService: ConfigService) {
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieSession({
        keys: [this.configService.get(COOKIE_SESSION_SECRET)]
      }))
      .forRoutes('*')
  }
}
