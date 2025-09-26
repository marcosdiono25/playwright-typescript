import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

const user = process.env.ORANGE_USER;
const pass = process.env.ORANGE_PASS;


if (!user || !pass ) throw new Error(
  "Variáveis de ambiente ORANGE_USER, ORANGE_PASS ou BASE_URL não definidas"
);

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
});

test.describe('Funcionalidade Login', () => {
  test('Fazer login com sucesso', async () => {
    await loginPage.fazerLogin(user, pass);
    await loginPage.validarLogin(true);
  });

  test('Fazer login com senha errada', async () => {
    await loginPage.fazerLogin(user, "orange123");
    await loginPage.validarLogin(false);
  });
});
