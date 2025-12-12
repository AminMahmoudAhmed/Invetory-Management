// /api/brands.js
// هذا مثال يستخدم مصفوفة مؤقتة (لو كنت تستخدم قاعدة بيانات حقيقية، استبدل هذا الكود بمنطق DB)
let brands = [
  { id: 1, name: "Brand A" },
  { id: 2, name: "Brand B" }
];

export default function handler(req, res) {
  // CORS Configuration (مهم لكي يعمل Angular)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET Requests (getBrands و getBrand)
  if (req.method === 'GET') {
    const brandId = req.query.id; 
    
    if (brandId) {
      // إذا كان الطلب getBrand(brandId)
      const brand = brands.find(b => b.id.toString() === brandId);
      return brand ? res.status(200).json(brand) : res.status(404).json({ message: 'Brand not found' });
    }
    // إذا كان الطلب getBrands()
    return res.status(200).json(brands);
  } 
  
  // POST Request (addBrand)
  else if (req.method === 'POST') {
    const newBrand = req.body;
    // هنا يجب إضافة الـ brand لقاعدة البيانات الحقيقية
    brands.push(newBrand); 
    return res.status(201).json(newBrand);
  } 
  
  // PUT Request (updateBrand)
  else if (req.method === 'PUT') {
    const updatedBrand = req.body;
    const id = updatedBrand.id;
    const index = brands.findIndex(b => b.id === id);

    if (index !== -1) {
      // هنا يجب تحديث الـ brand في قاعدة البيانات الحقيقية
      brands[index] = updatedBrand;
      return res.status(200).json(updatedBrand);
    } else {
      return res.status(404).json({ message: 'Brand not found for update' });
    }
  } 
  
  // Method Not Allowed
  else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}