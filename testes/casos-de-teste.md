# 🧪 Casos de Teste — SPA Responsive QA

> 🔗 Sistema sob teste (SUT): SPA Responsive QA  
> 🌐 Ambiente: Local (VS Code + Live Server)

---

## CT-001 — Verificar carregamento da página inicial

### Objetivo
Validar se a página principal carrega corretamente.

### Pré-condição
Servidor Live Server em execução.

### Passos
1. Abrir o navegador
2. Acessar o projeto SPA Responsive QA

### Resultado esperado
A página deve carregar corretamente exibindo:
- menu de navegação
- título principal
- botão “Ver Serviços”
- cards de serviços
- seção de depoimentos
- footer

### Resultado obtido
Página carregada corretamente com todos os elementos visíveis.

### Status
✅ Aprovado

---

## CT-002 — Verificar funcionamento do menu de navegação

### Objetivo
Validar se os links do menu direcionam corretamente para as seções da página.

### Pré-condição
Página carregada.

### Passos
1. Clicar em “Home”
2. Clicar em “Sobre”
3. Clicar em “Serviços”
4. Clicar em “Depoimentos”
5. Clicar em “Contato”

### Resultado esperado
A página deve realizar navegação suave até a seção correspondente.

### Resultado obtido
Os links navegaram corretamente entre as seções.

### Status
✅ Aprovado

---

## CT-003 — Verificar responsividade em resolução mobile

### Objetivo
Validar adaptação do layout em dispositivos móveis.

### Pré-condição
Página carregada.

### Passos
1. Abrir DevTools
2. Ativar modo responsivo
3. Selecionar resolução mobile

### Resultado esperado
O layout deve:
- reorganizar os elementos
- exibir cards em coluna
- manter legibilidade
- manter menu funcional

### Resultado obtido
Layout responsivo funcionando corretamente.

### Status
✅ Aprovado