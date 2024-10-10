import User from "../models/mongo/User";
import pg from "../databases/postgres";

class MetricasController {
    // Criar um novo usuário
    async calculateMetricas(idUsuario: string) {
        try {
            const userMongo = await User.find({ idUser: idUsuario });
            const query = `SELECT * FROM public."User" 
                WHERE "idUsuario" = $1;`
            const values = [idUsuario];
            const findUserPostgres = await pg.query(query, values);
            const userPostgres = findUserPostgres.rows[0];

            const { peso, altura, genero } = userPostgres;
            const alturaCM = altura / 100

            const IMC = peso / (alturaCM ** 2)
            let TMB = 10 * peso + 6.25 * alturaCM + 5
            const aguaIdeal = parseFloat((peso * 35).toFixed(2))

            if (genero == 'Feminino') {
                TMB = 10 * peso + 6.25 * alturaCM - 161
            }


            const calorias = parseFloat((TMB * 1.375).toFixed(2));
            const proteinas = parseFloat((peso * 2.2).toFixed(2));
            const gordura = parseFloat((peso * 7).toFixed(2));
            const carboidrato = parseFloat((peso * 4.25).toFixed(2));
            const acucar = parseFloat((peso / 0.66).toFixed(2));

            for (const users of userMongo) {
                users.macroIdeal.Caloria = calorias;
                users.macroIdeal.Proteina = proteinas;
                users.macroIdeal.gordura = gordura;
                users.macroIdeal.Carboidrato = carboidrato;
                users.macroIdeal.acucar = acucar;
                users.metrica.ImcIdeal = IMC;
                users.metrica.TmbIdeal = TMB;
                users.ingestaoAgua.ingestaoIdeal = aguaIdeal;
                users.save();
            }

        } catch (error) {
            console.error("Erro ao calcular as métricas do usuário:", error);
            return
        }
    }


}

export default new MetricasController();
