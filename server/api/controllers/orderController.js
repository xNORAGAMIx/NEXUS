import db from '../../config/db.js';

export const placeOrder = async (req, res) => {
    const userId = req.user.userId;
    const { shippingAddressId } = req.body;

    try {
        // Retrieve item from the shopping cart
        const [cartItems] = await db.query(`
        SELECT ci.product_id, ci.quantity, p.price AS price_at_purchase
        FROM CART_ITEMS ci
        JOIN PRODUCTS p ON ci.product_id = p.product_id
        JOIN SHOPPING_CART c ON ci.cart_id = c.cart_id
        WHERE c.user_id = ? AND c.cart_id = (SELECT cart_id FROM SHOPPING_CART WHERE user_id = ?)`, [userId, userId]);

        if (cartItems.length === 0) {
            return res.status(400).json({
                valid: false,
                message: 'Your shopping cart is empty.'
            })
        }

        // Step 2: Retrieve the zipcode of the selected shipping address
        const [shippingAddress] = await db.query(`
            SELECT pincode FROM SHIPPING_ADDRESSES WHERE address_id = ? AND user_id = ?`,
            [shippingAddressId, userId]
        );

        if (shippingAddress.length === 0) {
            return res.status(404).json({
                valid: false,
                message: 'Shipping address not found.'
            });
        }

        const userPincode = shippingAddress[0].pincode;

        // Loop through each cart item, check inventory at the nearest warehouse
        let warehouseId = null;
        for (const item of cartItems) {
            // Find a warehouse with matching pincode and sufficient stock for each product
            const [warehouseStock] = await db.query(`
                SELECT w.warehouse_id, i.quantity
                FROM WAREHOUSES w
                JOIN INVENTORY i ON w.warehouse_id = i.warehouse_id
                WHERE i.product_id = ? AND w.pincode = ?`,
                [item.product_id, userPincode]
            );

            if (!warehouseStock || warehouseStock.length === 0 || warehouseStock[0].capacity < item.quantity) {
                return res.status(400).json({
                    valid: false,
                    message: `Insufficient stock for product ID ${item.product_id} at the shipping address pincode.`
                });
            }

            // Assign warehouse_id from the first match with sufficient stock
            warehouseId = warehouseStock[0].warehouse_id;
        }

        // Step 4: Calculate total amount
        const totalAmount = cartItems.reduce((total, item) => {
            return total + item.price_at_purchase * item.quantity;
        }, 0);

        // Step 5: Insert order into ORDERS table
        const [orderResult] = await db.query(`
            INSERT INTO ORDERS (user_id, total_amount, order_status, shipping_address_id)
            VALUES (?, ?, 'Processing', ?)`, [userId, totalAmount, shippingAddressId]
        );

        const orderId = orderResult.insertId;

        // Insert initial status into ORDER_STATUS_HISTORY table
        await db.query(`
            INSERT INTO ORDER_STATUS_HISTORY (order_id, status)
            VALUES (?, 'Processing')`, [orderId]
        );

        // Insert items into ORDER_ITEMS and update inventory
        for (const item of cartItems) {
            await db.query(`
                INSERT INTO ORDER_ITEMS (order_id, product_id, warehouse_id, quantity, price_at_purchase)
                VALUES (?, ?, ?, ?, ?)`,
                [orderId, item.product_id, warehouseId, item.quantity, item.price_at_purchase]
            );

            await db.query(`
                UPDATE INVENTORY
                SET quantity = quantity - ?
                WHERE product_id = ? AND warehouse_id = ?`,
                [item.quantity, item.product_id, warehouseId]
            );
        }

        // Clear the shopping cart after order is placed
        await db.query(`
            DELETE FROM CART_ITEMS WHERE cart_id = (SELECT cart_id FROM SHOPPING_CART WHERE user_id = ?)`,
            [userId]
        );

        return res.status(201).json({
            valid: true,
            message: `Order placed successfully. Order ID: ${orderId}`
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'Failed to place order',
            error: err.message
        })
    }
}



export const getUserOrders = async (req, res) => {
    const userId = req.user.userId;
    try {
        const [orders] = await db.query(`
        SELECT order_id, total_amount, order_status, shipping_address_id, created_at
        FROM ORDERS
        WHERE user_id = ?
        ORDER BY created_at DESC`, [userId]);

        if (orders.length === 0) {
            return res.status(404).json({
                valid: false,
                message: 'You have not made any order'
            })
        }

        return res.status(200).json({
            valid: true,
            message: 'Orders fetched',
            orders
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'Failed to retrieve orders',
            error: err.message
        });
    }
}

export const getOrderItems = async (req, res) => {
    const userId = req.user.userId;
    const { orderId } = req.params;

    try {
        // Verify that the order belongs to the user
        const [order] = await db.query(`
            SELECT order_id FROM ORDERS WHERE order_id = ? AND user_id = ?`, [orderId, userId]
        );

        if (order.length === 0) {
            return res.status(403).json({
                valid: false,
                message: 'Order not found or does not belong to the user'
            });
        }

        // Retrieve items for the specified order
        const [orderItems] = await db.query(`
            SELECT oi.product_id, oi.quantity, oi.price_at_purchase, oi.warehouse_id
            FROM ORDER_ITEMS oi
            WHERE oi.order_id = ?`, [orderId]
        );

        return res.status(200).json({
            valid: true,
            orderItems
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'Failed to retrieve order items',
            error: err.message
        });
    }
}

export const getOrderStatusHistory = async (req, res) => {
    const userId = req.user.userId;
    const { orderId } = req.params;

    try {
        // Verify that the order belongs to the user
        const [order] = await db.query(`
            SELECT order_id FROM ORDERS WHERE order_id = ? AND user_id = ?`, [orderId, userId]
        );

        if (order.length === 0) {
            return res.status(403).json({
                valid: false,
                message: 'Order not found or does not belong to the user'
            });
        }

        // Retrieve status history for the specified order
        const [statusHistory] = await db.query(`
            SELECT status, changed_at
            FROM ORDER_STATUS_HISTORY
            WHERE order_id = ?
            ORDER BY changed_at ASC`, [orderId]
        );

        return res.status(200).json({
            valid: true,
            statusHistory
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            valid: false,
            message: 'Failed to retrieve order status history',
            error: err.message
        });
    }
};
