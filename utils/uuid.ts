import { v4 as uuidv4 } from 'uuid';
class uuid {
    generate(): string {
        return uuidv4();
    }
};

export default new uuid();  