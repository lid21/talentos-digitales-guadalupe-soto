import {pool} from './database.js';

class librosController{
//VISUALIZAR TODOS LOS LIBROS
    async getAll(req, res){
        try{
        const [result] = await pool.query('SELECT * FROM `libros`');
        res.json(result);
        }catch (error) {
            res.status(500).json({"error":"Ocurrio un error al obtener libros"});
        }
    }
    //VISUALIZAR UN LIBRO POR ID
    async getOne(req, res){
        try {
            const id = req.params.id;
            const [result] = await pool.query('SELECT * FROM `libros` WHERE id = (?)', [id]);
            if(result.length > 0) {
                res.json(result[0]);
            }else {
                res.status(404).json({"Error": "No se encontro el libro con el id proporcionado"});
            }
        } catch (error) {
            res.status(500).json({"Error": "Ocurrió un error al obtener el libro"});
        }
    }
    //AGREGAR UN LIBRO
    async add(req, res){
        try{
            const libros = req.body;
            const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, fechaPublicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libros.nombre, libros.autor, libros.categoria, libros.fechaPublicacion, libros.ISBN]);
            res.json({"Id insertado": result.insertId});
        }catch (error) {
            res.status(500).json({"Error": "Ocurrió un error al agregar el libro"});
        }
    }
    //ELIMINAR UN LIBRO POR ID
    async delete(req, res) {
        try{
        const libros = req.body;
        const [result] = await pool.query(`DELETE FROM Libros WHERE id=(?)`, [libros.id]);
        if(result.affectedRows <=0) return res.status(404).json({message:"Libro no encontrado"});
        res.json({"registros eliminados": result.affectedRows});
        } catch (error) {
            return res.status(500).json({ message:"no se puede eliminar el libro"});
        }
    }
    //ACTUALIZAR LIBROS
    async update(req, res){
        try{
            const libros = req.body;
            const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), fechaPublicacion=(?), ISBN=(?) WHERE id=(?)`, [libros.nombre, libros.autor, libros.categoria, libros.fechaPublicacion, libros.ISBN, libros.id]);
            res.json({"Libros actualizados": result.changedRows});
        }catch (error) {
            res.status(500).json({"Error": "Ocurrió un error al actualizar el libro"}); 
        }
    }
}

export const libros = new librosController();