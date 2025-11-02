import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BudgetModule } from "./budget/budget.module";
import { CertificateModule } from "./certificate/certificate.module";
import { DatabaseModule } from "./database/database.module";
import { MembersModule } from "./members/members.module";
import { PartnersModule } from "./partners/partners.module";
import { PresenceModule } from "./presence/presence.module";

@Module({
  imports: [
    DatabaseModule,
    PrismaModule,
    MembersModule,
    BudgetModule,
    PartnersModule,
    PresenceModule,
    CertificateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
