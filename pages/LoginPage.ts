import { Page } from '@playwright/test';
import { Metodos } from '../core/Metodos';

export class LoginPage extends Metodos {
    constructor(page: Page) {
        super(page);
    }

    // Seletores
    private readonly campoName = 'input[name="username"]';
    private readonly campoPassword = 'input[name="password"]';
    private readonly btnLogin = 'button.orangehrm-login-button:has-text("Login")';

    // Validações de presença
    private readonly validarMsgError = "Invalid credentials";
    private readonly validarDashboard = "Dashboard";

    // OBS: process.env não pode ser usado diretamente fora de método
    // melhor pegar a URL dentro do método ou criar um getter
    private get url(): string {
        const url = process.env.BASE_URL;
        if (!url) throw new Error("Variável BASE_URL não definida");
        return url;
    }

    async fazerLogin(usuario: string, senha: string): Promise<void> {
        await this.abrirUrl(this.url);
        await this.preencherCampo(this.campoName, usuario);
        await this.preencherCampo(this.campoPassword, senha);
        await this.clicarElemento(this.btnLogin);
    }

    async validarLoginComSucesso() {
        await this.validarPresenca(this.validarDashboard);
        await this.validarAusencia(this.validarMsgError);
        await this.validarAusencia(this.campoPassword);
    }

    async validarLoginComErro() {
        await this.validarPresenca(this.validarMsgError);
        await this.validarAusencia(this.validarDashboard);
        await this.validarPresenca(this.campoPassword);
    }

    async validarLogin(esperadoSucesso: boolean) {
        if (esperadoSucesso) {
            await this.validarLoginComSucesso();
        } else {
            await this.validarLoginComErro();
        }
    }
}
