import faker from "faker";

export default function generateUserData() {
    const user = {
        name: faker.name.findName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
    };

    return user;
}
