enum Role { ADMIN, READ_ONLY, AUTHOR };

const person: {
  name: string,
  age: number,
  hobbies: string[],
  role: [number, string],
  authorizedRole: Role
} = {
  name: 'Nicolas',
  age: 25,
  hobbies: ['Sports', 'Cooking'],
  role: [2,'author'], // Tupla
  authorizedRole: Role.ADMIN
}

console.log(person)