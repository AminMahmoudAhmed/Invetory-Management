// /api/orders.js
// *ملاحظة: هذا مثال يستخدم مصفوفة مؤقتة. يجب ربطه بقاعدة بيانات حقيقية.*

let orders = [
  { id: 101, productId: 1, quantity: 2, status: 'Pending' },
  { id: 102, productId: 3, quantity: 1, status: 'Delivered' }
];

export default function handler(req, res) {
  // CORS Configuration (مهم لكي يعمل Angular)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // 1. GET Requests (getOrders و getOrder)
  if (req.method === 'GET') {
    // الـ ID يتم استخراجه من الـ Query: (e.g., /api/orders?id=101)
    const orderId = req.query.id; 
    
    if (orderId) {
      // إذا كان الطلب getOrder(id)
      const order = orders.find(o => o.id.toString() === orderId);
      return order ? res.status(200).json(order) : res.status(404).json({ message: 'Order not found' });
    }
    // إذا كان الطلب getOrders()
    return res.status(200).json(orders);
  } 
  
  // 2. POST Request (addOrder)
  else if (req.method === 'POST') {
    const newOrder = req.body;
    // هنا يجب إضافة الطلب لقاعدة البيانات الحقيقية
    orders.push(newOrder); 
    return res.status(201).json(newOrder);
  } 
  
  // 3. PUT Request (updateOrder)
  else if (req.method === 'PUT') {
    const id = req.query.id; // يتم استخراج الـ ID من الـ URL
    const updatedOrder = req.body;
    const index = orders.findIndex(o => o.id.toString() === id);

    if (index !== -1) {
      // هنا يجب تحديث الطلب في قاعدة البيانات الحقيقية
      orders[index] = { ...orders[index], ...updatedOrder };
      return res.status(200).json(orders[index]);
    } else {
      return res.status(404).json({ message: 'Order not found for update' });
    }
  } 

  // 4. DELETE Request (deleteOrder)
  else if (req.method === 'DELETE') {
    const id = req.query.id; // يتم استخراج الـ ID من الـ URL
    const initialLength = orders.length;
    
    // فلترة وحذف الطلب من المصفوفة
    orders = orders.filter(o => o.id.toString() !== id); 
    
    if (orders.length < initialLength) {
        // هنا يجب حذف الطلب من قاعدة البيانات الحقيقية
        return res.status(204).end(); // 204 No Content هو الرد القياسي للحذف الناجح
    } else {
        return res.status(404).json({ message: 'Order not found for deletion' });
    }
  }
  
  // 5. Method Not Allowed
  else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}