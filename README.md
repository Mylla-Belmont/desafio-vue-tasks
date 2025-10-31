# Kanban Vue.js

Um **Kanban board** construído com **Vue 3**, **Vuetify 3**, **Pinia** e **json-server**, com suporte a **tema claro e escuro** e arrastar tarefas entre colunas.

---

## 🚀 Rodando o projeto

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd <nome-do-projeto>
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o projeto em modo de desenvolvimento:

```bash
npm run dev
json-server --watch db.json --port 3000
```

4. Abra o navegador em `http://localhost:3000` (ou a porta indicada pelo Vite).

---

## 🏗 Arquitetura do projeto

O projeto segue a **arquitetura de componentes** do Vue 3 + Composition API:

```
src/
├─ assets/               # Imagens, logos, ícones
├─ components/           # Componentes reutilizáveis
├─ composables/          # Toasts
├─ services/             # Services que ligam ao json-server
├─ stores/               # Stores do Pinia
├─ types/                # Interfaces reutilizáveis
├─ App.vue               # Componente raiz com layout do Kanban
└─ main.ts               # Ponto de entrada do Vue + Vuetify
```

---

## 💻 Tecnologias utilizadas

- [Vue 3](https://vuejs.org/) – Framework JavaScript reativo
- [Vuetify 3](https://vuetifyjs.com/) – Biblioteca de componentes Material Design
- [Vite](https://vitejs.dev/) – Bundler rápido para desenvolvimento
- [TypeScript](https://www.typescriptlang.org/) – Tipagem estática
- JSON-Server - Para persistência mínima de dados
- Pinia – Para controle de estado global
- Git – Controle de versão

---
