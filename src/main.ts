import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("HRownik")
    .setDescription("Twoje procesy rekrutacyjne w jednym miejscu")
    .setVersion("1.0")
    .addTag("Budget", "Zarządzanie pozycjami budżetu")
    .addTag("Members", "Członkowie")
    .addTag("Partners", "Partnerzy")
    .addTag("Presence", "Obecności")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
