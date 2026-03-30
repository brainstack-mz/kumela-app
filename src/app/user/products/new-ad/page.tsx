// src/app/admin/products/new-ad/page.tsx
"use client";

import ViewContainer from "@/components/user-components/ViewContainer";
import ProductForm from "@/components/products-user/ProductForm";
import { useRouter } from "next/navigation";

export default function NewAdPage() {
  const router = useRouter();

  return (
    <ViewContainer
      header="Criar Novo Anúncio"
      backButtonAction={() => router.back()}
    >
      <ProductForm />
    </ViewContainer>
  );
}