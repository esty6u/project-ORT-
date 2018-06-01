
export class User {
    constructor(
        public loggedIn: boolean,
        public type: string,
        public professions?: string[],
        public myStudents?: string[],
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public password?: string,
        public uid?: string,
        public appartment?: string,
        public docId?: string
    ) { }
}