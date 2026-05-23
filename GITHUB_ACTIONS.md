Fluxo mínimo para rodar testes com GitHub Actions

- Rodar localmente:

```bash
npm ci
npm run cypress:run
```

- O workflow do GitHub Actions está em `.github/workflows/ci.yml` e é executado em pushes e PRs para a branch `main`.
- Ele instala dependências com `npm ci`, executa `npm test` (que foi configurado para rodar o Cypress headless) e faz upload dos diretórios `cypress/screenshots` e `reports` como artifacts.
