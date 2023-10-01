import { Module } from "@nestjs/common";
import { CitizenController } from "./citizen.controller";
import { CitizenService } from "./citizen.service";
import { AppService } from "src/app.service";

@Module({
  controllers: [CitizenController],
  providers: [CitizenService, AppService],
})
export class CitizenModule {}
