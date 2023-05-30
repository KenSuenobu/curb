import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const SERVER_PORT = 3001;
const SWAGGER_PATH = '/api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('main');
  const config = new DocumentBuilder()
    .setTitle('curb-services')
    .setVersion('0.1')
    .setExternalDoc(
      'CURB Documentation',
      'https://www.suenobu.llc/curb/docs/',
    )
    .addTag('car-make', 'Car Make services', {
      description: 'Main Documentation and Suggestions',
      url: 'https://www.suenobu.llc/curb/docs/',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PATH, app, document);

  await app.listen(SERVER_PORT).then(() => {
    logger.log('CURB Services');
    logger.log(`Listening for connections on http://localhost:${SERVER_PORT}`);
  });
}
bootstrap();