"use strict";
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
;
const person = {
    name: 'Nicolas',
    age: 25,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author'],
    authorizedRole: Role.ADMIN
};
console.log(person);
