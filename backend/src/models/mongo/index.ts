import Data from "./Data";
import User from "./User";
import connectToDatabase from '../../databases/mongo'
export default async function CreateMongoDbCollections() {
    try {
        connectToDatabase();
        /*     await Data.createCollection()
            await User.createCollection() */

    } catch (error: any) {
        console.error("Erro ao criar collections no MongoDB:", error.message)
    }

}