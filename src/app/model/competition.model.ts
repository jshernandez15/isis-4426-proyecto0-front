import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Competition {
    constructor(
        public id: number,
        public name: string = '',
        public banner: string = '',
        public address: string = '',
        public init: NgbDateStruct = null,
        public end: NgbDateStruct = null,
        public prize: string = ''
    ) { }

    static empty() {
        let empty = ''
        return new this(0, empty, empty, empty, null, null, empty);
    }
}