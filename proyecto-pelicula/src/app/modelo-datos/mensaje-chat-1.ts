export class MensajeChat1 {
        constructor(
        public user: string,
        public content: string
    ){}
    toString(){
        return this.user + " " + this.content;
    }
}
