export class IngresoEgreso {
  constructor(
    public descripcion: string,
    public monto: number,
    public tipo: string,
    public id?: string,
    public uid?: string
  ) {}
}
