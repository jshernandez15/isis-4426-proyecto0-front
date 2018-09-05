
export class VideoBd {
    constructor(
        public id_video: number,
        public name: string = '',
        public last_name: string = '',
        public email: string = '',
        public path_real: string = '',
        public path_convertido: string = '',
        public description: string = '',
        public idConcurso: number,
        public stateVideo: string,
    ) { }

    static empty() {
        let empty = ''
        return new this(0, '', '', '', '', '', '', 0, '');
    }
}