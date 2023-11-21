import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";
import { AppModule } from "./app.module";
import * as bodyParser from "body-parser";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import * as winstonDailyRotateFile from "winston-daily-rotate-file";
import helmet from "helmet";
import * as dotenv from "dotenv";
import * as cors from "cors";

declare const module: any;
dotenv.config();

const transports = {
  console: new winston.transports.Console({
    level: "silly",
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.colorize({
        colors: {
          info: "blue",
          debug: "yellow",
          error: "red",
        },
      }),
      winston.format.printf((info) => {
        return `${info.timestamp} [${info.level}] [${
          info.context ? info.context : info.stack
        }] ${info.message}`;
      }),
      winston.format.align()
    ),
  }),
  combinedFile: new winstonDailyRotateFile({
    dirname: "logs",
    filename: "info",
    extension: ".log",
    level: "info",
  }),
  errorFile: new winstonDailyRotateFile({
    dirname: "logs",
    filename: "error",
    extension: ".log",
    level: "error",
  }),
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
    methods: "GET, PUT , POST, DELETE",
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
      "Access-Control-Allow-Origin",
    ],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const config = new DocumentBuilder()
    .setTitle("Resdiary Test")
    .setDescription("TEST THE RESERVATION PROCESS ON RESDIARY")
    // .addBearerAuth()
    .build();
  app.getHttpAdapter().getInstance().set("etag", false);

  app.useLogger(
    WinstonModule.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
      transports: [
        transports.console,
        transports.combinedFile,
        transports.errorFile,
      ],
    })
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");

  app.use(helmet());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(cors());
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
