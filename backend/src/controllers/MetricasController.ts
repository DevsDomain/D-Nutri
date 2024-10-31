import User from "../models/mongo/User";
import pg from "../databases/postgres";
export interface MetricasProps {
    calorias: number;
    proteinas: number;
    gordura: number;
    carboidrato: number;
    acucar: number;
    ImcAtual: number;
    TmbAtual: number;
    ImcIdeal: number;
    TmbIdeal: number;
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

            // Cálculo do IMC Atual
            const ImcAtual = parseFloat((peso / (alturaCM ** 2)).toFixed(2));

            // Cálculo do IMC Ideal baseado na altura
            const imcIdealReferencia = 22; // Referência do IMC ideal
            const pesoIdeal = imcIdealReferencia * (alturaCM ** 2);
            const ImcIdeal = parseFloat((pesoIdeal / (alturaCM ** 2)).toFixed(2));

            // Cálculo do TMB Ideal
            let TmbIdeal = 10 * peso + 6.25 * alturaCM + 5;
            const aguaIdeal = parseFloat((peso * 35).toFixed(2));

            if (genero === 'Feminino') {
                TmbIdeal = 10 * peso + 6.25 * alturaCM - 161;
            }

            // Cálculo do TMB Atual com base no gênero
            let TmbAtual;
            if (genero === 'Feminino') {
                TmbAtual = parseFloat(((10 * peso) + (6.25 * altura) - 161).toFixed(2));
            } else {
                TmbAtual = parseFloat(((10 * peso) + (6.25 * altura) + 5).toFixed(2));
            }



            const calorias = parseFloat((TmbIdeal * 3.5).toFixed(2));
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
                ImcAtual,
                TmbAtual,
                ImcIdeal,
                TmbIdeal,
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
