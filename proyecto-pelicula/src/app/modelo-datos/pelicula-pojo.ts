export class PeliculaPojo {
    constructor(private id: string,
                private titulo: string,
                private director: string,
                private sinopsis: string,
                private fecha: string,
                private valoracion: string
                //La ? es que es opcional
                ){}

    toString(): string{
        return "pelicula: \n\t ID:  "
                +this.id +"\n\t"
                +"Titulo:   " +this.titulo +"\n\t"
                +"Director: " +this.director +"\n\t"
                +"Director: " +this.sinopsis +"\n\t"
                +"Director: " +this.fecha +"\n\t"
                +"Director: " +this.valoracion +"\n\t"
                ;
    }
}
