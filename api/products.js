
let products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 25 }
];

export default function handler(req, res) {
  // CORS Configuration (مهم لكي يعمل Angular)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET Requests (getProducts و getProduct)
  if (req.method === 'GET') {
    const productId = req.query.id; 
    
    if (productId) {
      // إذا كان الطلب getProduct(id)
      const product = products.find(p => p.id.toString() === productId);
      return product ? res.status(200).json(product) : res.status(404).json({ message: 'Product not found' });
    }
    // إذا كان الطلب getProducts()
    return res.status(200).json(products);
  } 
  
  // POST Request (addProduct)
  else if (req.method === 'POST') {
    const newProduct = req.body;
    // هنا يجب إضافة المنتج لقاعدة البيانات الحقيقية
    products.push(newProduct); 
    return res.status(201).json(newProduct);
  } 
  
  // PUT Request (updateProduct)
  else if (req.method === 'PUT') {
    const id = req.query.id; // استخراج الـ ID من الـ URL
    const updatedProduct = req.body;
    const index = products.findIndex(p => p.id.toString() === id);

    if (index !== -1) {
      // هنا يجب تحديث المنتج في قاعدة البيانات الحقيقية
      products[index] = { ...products[index], ...updatedProduct };
      return res.status(200).json(products[index]);
    } else {
      return res.status(404).json({ message: 'Product not found for update' });
    }
  } 
  
  // Method Not Allowed
  else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}