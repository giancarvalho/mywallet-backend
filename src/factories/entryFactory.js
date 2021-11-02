import faker from "faker";
import dayjs from "dayjs";

export default function generateEntryData() {
    const entry = {
        description: faker.lorem.words(),
        amount: Number(faker.commerce.price()),
        type: "expense",
        date: dayjs().format("YYYY-MM-DD"),
    };

    return entry;
}
