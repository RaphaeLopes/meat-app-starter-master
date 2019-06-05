export class User{
  constructor(public email: string,
              public name: string,
              private password: string){}

  matches(another: User): boolean {
    return another !== undefined && another.email === this.email && another.password === this.password
  }
}

export const users: {[key: string]: User} = {
  "raphael@gmail.com": new User('raphael@gmail.com', 'Raphael', 'raphael123'),
  "Juliana@gmail.com": new User('Juliana@gmail.com', 'Juliana', 'juliana123')
}
