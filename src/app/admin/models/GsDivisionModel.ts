import {DistrictModel} from './DistrictModel';

export class GsDivisionModel {
  constructor(public id: number,
              public name: string,
              public gnDivisionNo: string,
              public pNo: string,
              public districtModel: DistrictModel) {
  }


}
