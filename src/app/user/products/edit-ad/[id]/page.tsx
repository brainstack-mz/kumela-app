// src/app/admin/products/edit-ad/[id]/page.tsx
import ViewContainer from "@/components/user-components/ViewContainer";
import ProductForm from "@/components/products-user/ProductForm";

// Dados mockados para simular a busca por um produto
const productsData = [
  {
    id: "1",
    name: "Tomate Fresco Orgânico",
    image: "/assets/imgs/tomate.jpeg",
    price: 50,
    discount: 10,
    location: "Nampula",
    category: "Verduras",
    quantity: 25,  
    unit: "kg",    
    createdAt: new Date(Date.now() - 3 * 3600 * 1000)
  },
  {
    id: "2",
    name: "Alface Hidropónica",
    image: "/assets/imgs/alface.jpeg",
    price: 35,
    location: "Nampula",
    category: "Verduras",
    quantity: 50,  
    unit: "molho",
    createdAt: new Date(Date.now() - 12 * 3600 * 1000)
  },
  // ... outros produtos
];

export default function EditAdPage({ params }) {
  const { id } = params;
  
  // Simula a busca do produto pelo ID. Em um projeto real, isso seria uma chamada de API.
  const productToEdit = productsData.find(p => p.id === id);

  if (!productToEdit) {
    return (
      <ViewContainer header="Produto Não Encontrado">
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Oops!</h2>
          <p className="mt-4 text-gray-600">O produto que você está tentando editar não existe ou o ID é inválido.</p>
        </div>
      </ViewContainer>
    );
  }

  return (
    <ViewContainer header="Editar Anúncio">
      <ProductForm initialData={productToEdit} />
    </ViewContainer>
  );
}