This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

FLUXO DE COMPRA — VERSÃO FINAL, OTIMIZADA E SIMPLIFICADA
PASSO 1 — Seleção do Produto

O cliente clica no produto e vê a tela de detalhes com pouquíssimas informações:

Detalhes exibidos

Preço

Stock

Descrição

Vendedor

Ações disponíveis

Enviar Mensagem ao Vendedor

Ao clicar, abre campo simples:

Nome

Número

Mensagem

Enviar direto.

Comprar Agora

Avança para o próximo passo.

👉 Nenhum outro campo aparece aqui. Tela rápida e simples.

PASSO 2 — Dados da Compra (super compacto)
🔹 A. Identificação do Cliente (via Número de Telefone)
Se estiver logado

Nome completo → preenchido automaticamente (campo travado).

Número de telefone → preenchido automaticamente (campo travado).

Cliente não digita nada.

Se NÃO estiver logado

Só aparece um campo: Número de telefone.

O sistema verifica:

1️⃣ Se o número existe no sistema:
→ Nome é preenchido automaticamente.

2️⃣ Se o número NÃO existe:
→ Aparece o campo Nome completo.
→ Após finalizar a compra, o sistema cria automaticamente uma conta simples com:

Número

Nome informado

🔹 B. Localização

Província: já vem predefinida (ex.: Nampula).

Cliente escolhe apenas o distrito.

👉 Apenas 1 campo aqui.

🔹 C. Quantidade

Cliente informa quantidade.

Sistema recalcula automaticamente:
Total = Preço unitário × Quantidade

🔹 D. Transportadora

Listar transportadoras com:

Nome

Tempo estimado

Preço do transporte

Ao selecionar uma, o valor do transporte é somado automaticamente ao total geral.

👉 Campos neste passo (máximo): Número, Nome (se necessário), Distrito, Quantidade, Transportadora.
Super enxuto.

PASSO 3 — Revisão do Pedido (1 tela só de confirmação)

Exibir resumo claro e grande:

Produto

Quantidade

Subtotal

Transporte

Total Geral

Nome

Número

Distrito

Botão grande: Finalizar Pedido

👉 Nenhum campo para preencher, apenas revisar e clicar.

PASSO 4 — Pagamento (Escrow)
Cliente escolhe:

M-Pesa

E-Mola

Mensagem clara e curta:

“O seu dinheiro fica seguro. Só será entregue ao vendedor depois da confirmação da entrega.”

Campos:

Número da carteira (preenchido se logado)

Senha

Pagamento é feito → Valor fica retido.

PASSO 5 — Entrega + Liberação Automática

Transportador marca Entregue

Cliente marca Recebido

Se ambos confirmam:

Sistema libera pagamento ao vendedor

Recibo enviado automaticamente (tela + SMS + email)

✅ REGRAS DE SEGURANÇA E CONFIRMAÇÃO
1. Confirmação dupla

O pagamento só é liberado quando:

Transportador confirma

Cliente confirma

2. Se alguém não confirmar
Caso A: Transportador confirma, cliente não

Sistema espera X horas (ex: 24h)

Envia alerta

Vai para Mediação

Caso B: Cliente confirma, transportador não

Sistema espera X horas

Envia alerta

Vai para Mediação

3. Autocomplete baseado no número

Número = ID principal

Nome só aparece automático se número existir

4. Recibo automático

Sem cliques extras

Enviado via:

Tela final

SMS

E-mail
 
