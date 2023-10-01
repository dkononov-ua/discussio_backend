/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccessModule } from './access/access.module';
import { UserinfoModule } from './userinfo/userinfo.module';
import { FlatinfoModule } from './flatinfo/flatinfo.module';
import { MulterModule } from '@nestjs/platform-express';
import { ImgController } from './img/img.controller';
import { ImgService } from './img/img.service';
import { ComunalModule } from './comunal/comunal.module';
import { SearchModule } from './search/search.module';
import { MailModule } from './mail/mail.module';
import { SubsModule } from './subs/subs.module';
import { AcceptSubsModule } from './acceptsubs/acceptsubs.module';
import { CitizenModule } from './citizen/citizen.module';
import { AgreementModule } from './agreement/agreement.module';
import { ChatModule } from './chat/chat.module';
import { FeaturesModule } from './features/features.module';
import { UsersubsModule } from './usersubs/usersubs.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [ AccessModule, UserinfoModule, FlatinfoModule, MulterModule.register({
    dest:"./Static"
  }), ComunalModule, SearchModule, MailModule, SubsModule, AcceptSubsModule, CitizenModule, AgreementModule, ChatModule, FeaturesModule, UsersubsModule, FeedbackModule],
  controllers: [AppController, ImgController],
  providers: [AppService, ImgService],
  exports:[AppService]
})
export class AppModule {}
