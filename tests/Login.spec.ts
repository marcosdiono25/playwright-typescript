import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';

// Carrega .env apenas se NÃO estiver no GitHub Actions
if (process.env.NODE_ENV !== 'github') {
    dotenv.config();
}

let loginPage: LoginPage;

const user = process.env.ORANGE_USER;
const pass = process.env.ORANGE_PASS;
const url = process.env.BASE_URL;

if (!user || !pass || !url) throw new Error("Variáveis de ambiente ORANGE_USER, ORANGE_PASS ou BASE_URL não definidas");

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
