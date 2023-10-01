import { Module } from "@nestjs/common";
import { FlatinfoController } from "./flatinfo.controller";
import { FlatinfoService } from "./flatinfo.service";
import { AppService } from "src/app.service";

@Module({
  controllers: [FlatinfoController],
  providers: [FlatinfoService, AppService],
})
export class FlatinfoModule {}
