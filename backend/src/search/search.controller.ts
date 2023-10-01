/* eslint-disable prettier/prettier */
import { Controller, Get, Query, Response, Post, Body } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly SearchService: SearchService) {}


    @Get('flat')
    async yourRoute(@Response() res,@Query('flat_id') flat_id: string, @Query('country') country: string, 
    @Query('region') region: string, @Query('city') city: string,
      @Query('repair_status') repair_status: string, @Query('kitchen_area') kitchen_area: string | Number, @Query('balcony') balcony: string,
      @Query('floor') floor: string, @Query('bunker') bunker: string, @Query('distance_metro') distance_metro: string | Number, 
      @Query('distance_stop') distance_stop: string | Number, 
      @Query('distance_shop') distance_shop: string | Number, @Query('distance_green') distance_green: string | Number, 
      @Query('distance_parking') distance_parking: string | Number, 
      @Query('woman') woman: string, @Query('man') man: string, @Query('family') family: string, 
      @Query('students') students: string, @Query('animals') animals: string, 
      @Query('price_of') price_of: string | Number, @Query('price_to') price_to: string | Number, @Query('limit') limit: string | Number, 
      @Query('area_of') area_of: string | Number, @Query('area_to') area_to: string | Number,
      @Query('rooms_of') rooms_of: string | Number, @Query('rooms_to') rooms_to: string | Number, @Query('street') street: string
      , @Query('option_pay') option_pay: string, @Query('room') room: string, @Query('option_flat') option_flat: string, @Query('filterData') filterData:string) {
      const params = {flat_id: flat_id, country: country,
        region: region, city: city, repair_status: repair_status,
        kitchen_area: kitchen_area, balcony: balcony,
        floor: floor, bunker: bunker, distance_metro: distance_metro,
        distance_stop: distance_stop, distance_shop: distance_shop, distance_green: distance_green,
        distance_parking: distance_parking, woman: woman, man: man, family: family, students: students, animals: animals,
        price_of: price_of, price_to: price_to, limit:limit, area_of: area_of, area_to: area_to, rooms_of: rooms_of, rooms_to: rooms_to, street:street,
        option_pay: option_pay, room: room, option_flat: option_flat, filterData: filterData
      };
      await this.SearchService.getFlats(params, res) 
    }

    @Post('user')
    // eslint-disable-next-line @typescript-eslint/ban-types
    async getUsers(@Response() res, @Body() tok: Object): Promise<any> {

      await this.SearchService.getUsers(tok, res);
    }

    // @Post('add/comunal')
    // // eslint-disable-next-line @typescript-eslint/ban-types
    // async addComunal(@Response() res, @Body() tok: Object): Promise<any> {
    //   await this.ComunalService.addComunal(tok, res);
    // }



}
