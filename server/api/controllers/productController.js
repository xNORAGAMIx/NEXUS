import db from '../../config/db.js';

export const addProduct = async(req,res) => {
    const {name, description, category_id, price, max_stock, min_stock} = req.body;
    const productImages = req.files;
    try {
        const [product] = await db.query('INSERT INTO PRODUCTS (name, description, category_id, price, max_stock, min_stock) VALUES(?,?,?,?,?,?)', [name, description, category_id, price, max_stock, min_stock]);

        // Insert associated images into IMAGES table
        if (productImages && productImages.length > 0) {
            const imagePromises = productImages.slice(0, 4).map(async (image) => {
                const imagePath = `/uploads/images/${image.filename}`; // File path to store in DB

                // Insert image path into the IMAGES table
                await db.query('INSERT INTO IMAGES (image_data, product_id) VALUES (?, ?)', [imagePath, product.insertId]);
            });

            await Promise.all(imagePromises);
        }

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
        const [rows] = await db.query(`
        SELECT p.product_id, p.name AS name, p.description AS description, 
        p.price, p.max_stock, p.min_stock, c.name AS category_name
        FROM PRODUCTS p
        JOIN CATEGORIES c ON p.category_id = c.category_id`);

        if (rows.length === 0) {
            return res.status(404).json({
                valid: false,
                message: 'No products found'
            });
        }

        // Fetch images for all products and map them by product_id
        const [imageRows] = await db.query('SELECT * FROM IMAGES');
        const imagesMap = imageRows.reduce((acc, image) => {
            if (!acc[image.product_id]) acc[image.product_id] = [];
            acc[image.product_id].push(image.image_data);
            return acc;
        }, {});

        // Attach images to their corresponding products
        const productsWithImages = rows.map((product) => ({
            ...product,
            images: imagesMap[product.product_id] || []  // Attach images or an empty array if no images are found
        }));

        return res.status(200).json({
            valid: true,
            message: "Products fetched",
            products: productsWithImages
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
        //Product details from PRODUCTS TABLE
        const [rows] = await db.query('SELECT * FROM PRODUCTS WHERE product_id = ?', [id]);

        if(rows.length === 0) {
            return res.status(404).json({
                valid: false,
                message: "Product not found"
            })
        }

        //Associated images for the product from IMAGES TABLE
        const [imageRows] = await db.query('SELECT image_data FROM IMAGES WHERE product_id = ?', [id]);

        // Generate image URLs
        const images = imageRows.map((image) => image.image_data);

        //combine results
        const product = rows[0];
        product.images = images;

        return res.status(200).json({
            valid: true,
            message: "Product fetched",
            products: product
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