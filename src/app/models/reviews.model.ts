
export class Reviews{
    constructor(
        public productId: String,
        public userId: String,
        public profileName: String,
        public helpfulness: String,
        public score: number,
        public time: number,
        public summary: String,
        public text: String,

        
    ){

    }
}