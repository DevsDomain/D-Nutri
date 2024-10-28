import User from "../models/mongo/User";
import pg from "../databases/postgres";
export interface MetricasProps {
    calorias: number;
    proteinas: number;
    gordura: number;
    carboidrato: number;
    acucar: number;
    IMC: number;
    TMB: number;
    aguaIdeal: number;
}
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


            const calorias = parseFloat((TMB * 3.5).toFixed(2));
            const proteinas = parseFloat((peso * 2.5).toFixed(2));
            const gordura = parseFloat((peso * 4.65).toFixed(2));
            const carboidrato = parseFloat((peso * 4.25).toFixed(2));
            const acucar = parseFloat((peso / 0.66).toFixed(2));

            const MetricasValues: MetricasProps = {
                calorias,
                proteinas,
                gordura,
                carboidrato,
                acucar,
                IMC,
                TMB,
                aguaIdeal

            }


            return MetricasValues

        } catch (error) {
            console.error("Erro ao calcular as métricas do usuário:", error);
            return
        }
    }


    


}

export default new MetricasController();
