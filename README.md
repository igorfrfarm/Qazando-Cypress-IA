# Cypress E2E Boilerplate

Pequeno projeto de exemplo com testes E2E usando Cypress.

## Pré-requisitos
- Node.js >= 18
- npm (ou yarn)

## Instalação
Para CI (recomendado):

```bash
npm ci
```

Para desenvolvimento local:

```bash
npm install
```

## Abrir a UI do Cypress (modo interativo)

```bash
npm run cypress:open
```

## Executar testes headless

```bash
npm run cypress:run
```

Ou (atalho definido):

```bash
npm test
```

## CI (GitHub Actions)
O workflow de CI está em [cypress-e2e/.github/workflows/ci.yml](.github/workflows/ci.yml#L1-L120). Ele instala dependências, executa `npm test` e envia os diretórios `cypress/screenshots` e `reports` como artifacts.

## Estrutura importante
- `cypress/` — tests (`e2e`), `pages/` e `support/`
- `.github/workflows/ci.yml` — workflow de CI
- `package.json` — scripts e dependências
- `GITHUB_ACTIONS.md` — instruções extras

## Observações
- Adicione um `.gitignore` com ao menos:

```
node_modules/
cypress/videos/
.env
```

- Use `npm ci` em ambientes de CI e `npm install` para desenvolvimento local.

Se quiser, eu posso adicionar `workflow_dispatch` ao workflow para permitir execuções manuais via UI.
