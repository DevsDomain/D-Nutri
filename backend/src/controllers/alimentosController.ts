import { Request, Response } from 'express';
import pg from "../../../backend/src/databases/postgres";

// Adicionar um alimento
export async function addAlimento(req: Request, res: Response) {
    const { barcode, nomeProduto, imageSrc, Proteina, Caloria, Carboidrato, gordura, sodio, acucar } = req.body;

    try {
        const result = await pg.query(
            `INSERT INTO "Alimentos" 
            ("barcode", "nomeProduto", "imageSrc", "Proteina", "Caloria", "Carboidrato", "gordura", "sodio", "acucar") 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`,
            [barcode, nomeProduto, imageSrc, Proteina, Caloria, Carboidrato, gordura, sodio, acucar]
        );

        return res.status(201).json({ message: "Alimento adicionado com sucesso!", alimento: result.rows[0] });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao adicionar alimento:", error.message);
            return res.status(500).json({ error: "Erro ao adicionar alimento." });
        }
    }
}

// Obter todos os alimentos
export async function getAlimentos(req: Request, res: Response) {
    try {
        const result = await pg.query(`SELECT * FROM "Alimentos";`);
        return res.status(200).json(result.rows);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao buscar alimentos:", error.message);
            return res.status(500).json({ error: "Erro ao buscar alimentos." });
        }
    }
}

// Obter alimento por ID
export async function getAlimentoById(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const result = await pg.query(`SELECT * FROM "Alimentos" WHERE "idProduto" = $1;`, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Alimento não encontrado." });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao buscar alimento:", error.message);
            return res.status(500).json({ error: "Erro ao buscar alimento." });
        }
    }
}

// Atualizar um alimento
export async function updateAlimento(req: Request, res: Response) {
    const { id } = req.params;
    const { barcode, nomeProduto, imageSrc, Proteina, Caloria, Carboidrato, gordura, sodio, acucar } = req.body;

    try {
        const result = await pg.query(
            `UPDATE "Alimentos" SET
            "barcode" = $1, 
            "nomeProduto" = $2, 
            "imageSrc" = $3, 
            "Proteina" = $4, 
            "Caloria" = $5, 
            "Carboidrato" = $6, 
            "gordura" = $7, 
            "sodio" = $8, 
            "acucar" = $9 
            WHERE "idProduto" = $10 RETURNING *;`,
            [barcode, nomeProduto, imageSrc, Proteina, Caloria, Carboidrato, gordura, sodio, acucar, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Alimento não encontrado." });
        }

        return res.status(200).json({ message: "Alimento atualizado com sucesso!", alimento: result.rows[0] });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao atualizar alimento:", error.message);
            return res.status(500).json({ error: "Erro ao atualizar alimento." });
        }
    }
}

// Deletar um alimento
export async function deleteAlimento(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const result = await pg.query(`DELETE FROM "Alimentos" WHERE "idProduto" = $1 RETURNING *;`, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Alimento não encontrado." });
        }

        return res.status(200).json({ message: "Alimento deletado com sucesso!" });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao deletar alimento:", error.message);
            return res.status(500).json({ error: "Erro ao deletar alimento." });
        }
    }
}
