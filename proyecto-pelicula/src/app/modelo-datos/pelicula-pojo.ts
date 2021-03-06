export class PeliculaPojo {
    //Variable booelean para asignar la clase .filaClickada a la fila 
    //Clickada y resaltarla
    booelanIsActive: boolean=false;


    //He tenido que cambiar todas las properties de PeliculaPojo a public,
    //por que sort no reconocia los getters en la clasew peliculas-ui.component.ts
    constructor( public _id: string,
                 public titulo: string,
                 public director: string,
                 public sinopsis: string,
                 public fecha: string,
                 public valoracion: string
                //La ? es que es opcional
                ){}

                //Getters
                setId(id: string): void{
                    this._id = id;
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
                getId(): string{
                    return this._id;
                }

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
                +this._id +"\n\t"
                +"Titulo:   " +this.titulo +"\n\t"
                +"Director: " +this.director +"\n\t"
                +"Director: " +this.sinopsis +"\n\t"
                +"Director: " +this.fecha +"\n\t"
                +"Director: " +this.valoracion +"\n\t"
                ;
    }
}
