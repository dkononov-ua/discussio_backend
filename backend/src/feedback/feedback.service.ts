/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import conee from 'src/db';
import { AppService } from 'src/app.service';


@Injectable()
export class FeedbackService {
	constructor(private readonly appService: AppService) { }

	async addFeedback(tok: any, res: any): Promise<any> {
		console.log(tok)
		let a = await this.appService.authentification(tok.auth)
		if (a) {
			let b = await this.appService.addFeedback(tok.formData, a.user_id)
			res.status(200).json(b);
		} else {
			res.status(200).json({ status: false });
		}
	}


	async getUserFeedback(tok: any, res: any): Promise<any> {
		let a = await this.appService.authentification(tok.auth)
		if (a) {
			let b = await this.appService.getFeedback(a.user_id, tok.menuName)
			res.status(200).json(b);
		} else {
			res.status(200).json({ status: false });
		}
	}

	async getAdminFeedback(tok: any, res: any): Promise<any> {
		if (tok.auth.password == 123456 && tok.auth.email == "discAdm321") {
			let b = await this.appService.getAdminFeedback(tok.menuName)
			res.status(200).json(b);
		} else {
			res.status(200).json({ status: false });
		}
	}


}
