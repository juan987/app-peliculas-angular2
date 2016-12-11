export class MensajeChat1 {
        constructor(
        public user: string,
        public content: string,
        public dbModificada: number
    ){}
    toString(){
        return this.user + " " + this.content;
    }
}
