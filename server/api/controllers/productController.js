import db from '../../config/db.js';

export const addProduct = async(req,res) => {
    const {name, description, category_id, price, max_stock, min_stock} = req.body;
    try {
        const [product] = await db.query('INSERT INTO PRODUCTS (name, description, category_id, price, max_stock, min_stock) VALUES(?,?,?,?,?,?)', [name, description, category_id, price, max_stock, min_stock]);

        return res.status(201).json({
            valid: true,
            message: "Product added",
            product: product.insertId
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: "Product could not be added",
            error: err.message
        })
    }
}

export const getAllProducts = async(req,res) => {
    try {
        const [rows] = await db.query('SELECT * FROM PRODUCTS');

        return res.status(200).json({
            valid: true,
            message: "Products fetched",
            products: rows
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: "Products could not be fetched",
            error: err.message
        })
    }
}

export const getProductById = async(req,res) => {
    const id = req.params.id;
    try {
        const [rows] = await db.query('SELECT * FROM PRODUCTS WHERE product_id = ?', [id]);

        if(rows.length === 0) {
            return res.status(404).json({
                valid: false,
                message: "Product not found"
            })
        }

        return res.status(200).json({
            valid: true,
            message: "Product fetched",
            products: rows
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: "Product could not be fetched",
            error: err.message
        })
    }
}

export const deleteProduct = async (req,res) => {
    const id = req.params.id;
    try {
        const [rows] = await db.query('DELETE FROM PRODUCTS WHERE product_id = ?', [id]);

        if(rows.affectedRows === 0) {
            return res.status(404).json({
                valid: false,
                message: "Product not found"
            })
        }
        
        return res.status(200).json({
            valid: true,
            message: "Products deleted",
            products: rows
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: "Product could not be deleted",
            error: err.message
        })
    }
}

export const updateProduct = async (req,res) => {

}