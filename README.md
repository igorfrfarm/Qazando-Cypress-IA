# Cypress E2E Boilerplate

Pequeno projeto de exemplo com testes E2E em Cypress.

Install:

```bash
npm install
```

Prerequisite:

- Node.js >= 18

Open tests (GUI):

```bash
npm run cypress:open
```

Run tests headless:

```bash
npm run cypress:run
```

Shortcut:

```bash
npm test
```

Note: in CI environments prefer `npm ci`.


# Cypress Execution Report

Started: 2026-05-19T14:49:21.974Z
Ended: 2026-05-19T14:49:43.639Z

Total: 12   Passed: 12   Failed: 0

Spec: Login.cy.js
Tests: 6   Pass: 6   Fail: 0
PASSED: Testes de Login - aplicação de exemplo › Login com sucesso (senha > 6 dígitos)
PASSED: Testes de Login - aplicação de exemplo › Falha: e-mail vazio
PASSED: Testes de Login - aplicação de exemplo › Falha: senha vazia
PASSED: Testes de Login - aplicação de exemplo › Falha: ambos os campos vazios
PASSED: Testes de Login - aplicação de exemplo › Falha: senha com menos de 6 dígitos
PASSED: Testes de Login - aplicação de exemplo › Link "ainda não tem conta?" leva à página de cadastro

Spec: register.cy.js
Tests: 6   Pass: 6   Fail: 0
PASSED: Testes de Cadastro - aplicação de exemplo › Cadastro com sucesso (senha > 6 dígitos)
PASSED: Testes de Cadastro - aplicação de exemplo › Falha: nome vazio
PASSED: Testes de Cadastro - aplicação de exemplo › Falha: e-mail vazio
PASSED: Testes de Cadastro - aplicação de exemplo › Falha: e-mail inválido
PASSED: Testes de Cadastro - aplicação de exemplo › Falha: senha vazia
PASSED: Testes de Cadastro - aplicação de exemplo › Falha: senha com menos de 6 dígitos
