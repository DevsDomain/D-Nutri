import createTableUsers from "./user";
import createTableAlimentos from "./alimentos";
import createTableFavoritos from "./favoritos";

export default async function createPostgresTables() {
    try {
        await createTableUsers();
    } catch (error: any) {
        console.log("ERRO AO CRIAR TABELA DE USUÁRIOS NO POSTGRES:", error.message)
    }

    try {
        await createTableAlimentos();
    } catch (error: any) {
        console.log("ERRO AO CRIAR TABELA DE ALIMENTOS NO POSTGRES", error.message)
    }

    try {
        await createTableFavoritos();
    } catch (error: any) {
        console.log("ERRO AO CRIAR TABELA DE FAVORITOS NO POSTGRES", error.message)
    }

}

