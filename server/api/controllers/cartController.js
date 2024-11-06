import db from '../../config/db.js';

export const addItems = async (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.userId;
    try {
        //Check if shopping cart exists for user 
        const [cart] = await db.query('SELECT cart_id FROM SHOPPING_CART WHERE user_id =?', [userId]);

        //If no cart exists, create one
        if (cart.length === 0) {
            await db.query('INSERT INTO SHOPPING_CART (user_id, created_at) VALUES (?, NOW())', [userId]);
            [cart] = await db.query('SELECT cart_id FROM SHOPPING_CART WHERE user_id = ?', [userId]);
        }

        const cartId = cart[0].cart_id;

        //Add item to cart or update the quantity if it already exists
        await db.query(
            `INSERT INTO CART_ITEMS (cart_id, product_id, quantity, added_at)
             VALUES (?, ?, ?, NOW())
             ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
            [cartId, productId, quantity, quantity]
        );

        return res.status(200).json({
            valid: true,
            message: 'Item added to cart'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'Error adding item to cart',
            error: err.message
        })
    }
}

export const viewCart = async (req, res) => {
    const userId = req.user.userId;
    try {
        const [cartItems] = await db.query(`
        SELECT ci.cart_item_id, p.name, p.price, ci.quantity 
        FROM CART_ITEMS ci 
        JOIN PRODUCTS p ON ci.product_id = p.product_id 
        WHERE ci.cart_id = (SELECT cart_id FROM SHOPPING_CART WHERE user_id = ?)`, [userId]);

        return res.status(200).json({
            valid: true,
            message: 'Cart items retrieved',
            cartItems
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'Error viewing cart items',
            error: err.message
        })
    }
}

export const updateCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;
    try {
        if (quantity > 0) {
            await db.query('UPDATE CART_ITEMS SET quantity = ? WHERE cart_id = (SELECT cart_id FROM SHOPPING_CART WHERE user_id = ?) AND product_id = ?', [quantity, userId, productId]);
        } else {
            // If quantity is zero or less, remove the item from the cart
            await db.query(
                'DELETE FROM CART_ITEMS WHERE cart_id = ? AND product_id = ?',
                [userId, productId]
            );
        }
        return res.status(200).json({
            valid: true,
            message: 'Item quantity updated'
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'Error updating item quantity',
            error: err.message
        })
    }
}

export const deleteItem = async (req, res) => {
    const id = req.params.id;
    const userId = req.user.userId;
    try {
        await db.query('DELETE FROM CART_ITEMS WHERE cart_id = (SELECT cart_id FROM SHOPPING_CART WHERE user_id = ?) AND product_id = ?', [userId, id]);

        return res.status(200).json({
            valid: true,
            message: 'Item removed'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'Error deleting cart item',
            error: err.message
        })
    }
}