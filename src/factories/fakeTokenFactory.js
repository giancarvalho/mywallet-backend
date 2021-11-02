import faker from "faker";

export default function generateFakeToken() {
    return faker.datatype.uuid();
}
