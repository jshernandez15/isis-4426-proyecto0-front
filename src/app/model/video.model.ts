import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Video {
    constructor(
        public id_video: number,
        public name: string = '',
        public lastName: string = '',
        public email: string = '',
        public description: string = '',
        public path: string,
        public idConcurso: number,
        public stateVideo: string,
    ) { }

    static empty() {
        let empty = ''
        return new this(0, '', '', '', '', '', 0, '');
    }
}