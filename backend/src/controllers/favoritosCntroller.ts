import pg from "../databases/postgres";

// Adicionar um produto aos favoritos de um usuário
export async function addFavorito(req, res) {
    const { idProduto, idUsuario } = req.body;

    try {
        const result = await pg.query(
            `INSERT INTO "Favoritos" ("idProduto", "idUsuario") 
             VALUES ($1, $2) 
             ON CONFLICT ("idProduto", "idUsuario") 
             DO UPDATE SET "isFavorito" = true 
             RETURNING *;`,
            [idProduto, idUsuario]
        );
        
        return res.status(201).json({ message: 'Favorito adicionado com sucesso!', favorito: result.rows[0] });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao adicionar favorito.' });
    }
}

// Remover um produto dos favoritos de um usuário
export async function removeFavorito(req, res) {
    const { idProduto, idUsuario } = req.body;

    try {
        const result = await pg.query(
            `UPDATE "Favoritos" 
             SET "isFavorito" = false 
             WHERE "idProduto" = $1 AND "idUsuario" = $2 
             RETURNING *;`,
            [idProduto, idUsuario]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Favorito não encontrado.' });
        }

        return res.status(200).json({ message: 'Favorito removido com sucesso!' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao remover favorito.' });
    }
}

// Listar todos os favoritos de um usuário
export async function getFavoritos(req, res) {
    const { idUsuario } = req.params;

    try {
        const result = await pg.query(
            `SELECT * FROM "Favoritos" 
             WHERE "idUsuario" = $1 AND "isFavorito" = true;`,
            [idUsuario]
        );

        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar favoritos.' });
    }
}
