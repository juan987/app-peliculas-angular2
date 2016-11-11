export class PeliculaPojo {
    constructor( private id: string,
                 private titulo: string,
                 private director: string,
                 private sinopsis: string,
                 private fecha: string,
                 private valoracion: string
                //La ? es que es opcional
                ){}

                //Getters
                setId(id: string): void{
                    this.id = id;
                }
                setTitulo(titulo: string): void{
                    this.titulo = titulo;
                }

                setDirector(director: string): void{
                    this.director = director;
                }

                setSinopsis(sinopsis: string): void{
                    this.sinopsis = sinopsis;
                }

                setFecha(fecha: string): void{
                    this.fecha = fecha;
                }
                setValoracion(valoracion: string): void{
                    this.valoracion = valoracion;
                }


                //Getters
                getTitulo(): string{
                    return this.titulo;
                }

                getDirector(): string{
                    return this.director;
                }

                getSinopsis(): string{
                    return this.sinopsis;
                }

                getFecha(): string{
                    return this.fecha;
                }

                getValoracion(): string{
                    return this.valoracion;
                }

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
