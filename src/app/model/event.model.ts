import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Event {
    constructor(
        public id: number,
        public name: string = '',
        public category: string = 'Selecciona una opción',
        public place: string = '',
        public address: string = '',
        public init: NgbDateStruct = null,
        public end: NgbDateStruct = null,
        public stage: string = 'Selecciona una opción'
    ) { }

    static empty() {
        let empty = ''
        return new this(0, empty, 'Selecciona una opción', empty, empty, null, null, 'Selecciona una opción');
    }
}