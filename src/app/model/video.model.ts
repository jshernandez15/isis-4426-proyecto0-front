
export class Video {
    constructor(
        public id_video: number,
        public name: string = '',
        public lastName: string = '',
        public email: string = '',
        public description: string = '',
        public path: string,
        public pathConvertido: string,
        public idConcurso: number,
        public stateVideo: string,
        public created: Date
    ) { }

    static empty() {
        let empty = ''
        return new this(0, '', '', '', '', '', '', 0, '', null);
    }
}