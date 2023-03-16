import {MongoClient} from "mongodb"

const user = 'user_001';
const userPassword = 'LjshLzgOlAdIWDbd';
const cluster = 'cluster0.zap1enl'

const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/?retryWrites=true&w=majority`;

export const connectDatabase = async () => {
    const client = await MongoClient.connect(url);

}