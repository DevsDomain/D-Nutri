import Agua from "./Agua";
import Alimento from "./Alimento";
import Data from './Data'
import Food from './Food'
import Metrica from './Metrica'
import User from './MgUser'
import NutrientesIdeal from './NutrientesIdeal'
import NUtrientesReal from './NutrientesReal'
import connectToDatabase from "./connection";

export default async function CreateMongoDbCollections() {
    try {
        connectToDatabase();
        await Agua.createCollection()
        await Alimento.createCollection()
        await Data.createCollection()
        await Food.createCollection()
        await Metrica.createCollection()
        await User.createCollection()
        await NutrientesIdeal.createCollection()
        await NUtrientesReal.createCollection()
    } catch (error: any) {
        console.error("Erro ao criar collections no MongoDB:", error.message)
    }

}