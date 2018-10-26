export class VideoBd {
  constructor(
    public id: string,
    public name: string = "",
    public last_name: string = "",
    public email: string = "",
    public path_real: string = "",
    public path_convertido: string = "",
    public description: string = "",
    public idConcurso: string,
    public state_video: string,
    public dateCreated: Date
  ) {}

  static empty() {
    let empty = "";
    return new this("", "", "", "", "", "", "", "", "", null);
  }
}
