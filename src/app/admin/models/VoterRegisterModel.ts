export class VoterRegisterModel {
  constructor(public firstName:string,
              public lastName:string,
              public nicNo:number,
              public gsDivisionId:number,
              public specificDetails:string,
              public imageUrl:File,
                public userType:number,){}
}
