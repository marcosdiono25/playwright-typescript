import { Page, Locator, expect } from '@playwright/test';

export class Metodos {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ======================
  // Navegação
  // ======================
  async abrirUrl(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async fecharNavegador(): Promise<void> {
    await this.page.close();
  }

  // ======================
  // Interações
  // ======================
  async clicarElemento(seletor: string): Promise<void> {
    await this.page.waitForSelector(seletor, { state: 'visible' });
    await this.page.click(seletor);
  }

  async preencherCampo(seletor: string, texto: string): Promise<void> {
    await this.page.waitForSelector(seletor, { state: 'visible' });
    await this.page.fill(seletor, texto);
  }

  // ======================
  // Validações
  // ======================
  async validarPresenca(target: string | Locator, timeout = 5000) {
    const locator = this.resolverLocator(target);
    await expect(locator.first(), `Elemento não encontrado: ${target}`).toBeVisible({ timeout });
  }

  async validarAusencia(target: string | Locator, timeout = 5000) {
    const locator = this.resolverLocator(target);
    await expect(locator, `Elemento ainda presente: ${target}`).toHaveCount(0, { timeout });
  }

  // ======================
  // Resolver inteligente
  // ======================
  private resolverLocator(target: string | Locator): Locator {
    if (typeof target !== 'string') return target; // já é Locator, retorna direto

    const isCssSelector =
      target.startsWith('#') ||
      target.startsWith('.') ||
      target.startsWith('[') ||
      target.match(/^(button|a|span|input|img|div|textarea|label|h[1-6])(\.|#|\[|:|$)/);

    if (isCssSelector) return this.page.locator(target);

    if (target.startsWith('txt=') || target.startsWith('text=')) {
      return this.page.getByText(target.replace(/^txt=|^text=/, ''), { exact: false });
    }

    if (target.startsWith('alt=')) return this.page.getByAltText(target.replace('alt=', '').trim());
    if (target.startsWith('title=')) return this.page.getByTitle(target.replace('title=', '').trim());

   if (target.startsWith('role=')) {
      const [role, name] = target.replace('role=', '').split(':');
      return this.page.getByRole(role as any, name ? { name } : undefined);
    }


    if (target.startsWith('ph=') || target.startsWith('placeholder=')) {
      return this.page.getByPlaceholder(target.replace(/^ph=|^placeholder=/, ''));
    }

    if (target.startsWith('label=')) return this.page.getByLabel(target.replace('label=', ''));
    if (target.startsWith('id=') || target.startsWith('data-testid=')) {
      return this.page.getByTestId(target.replace(/^id=|^data-testid=/, ''));
    }

    return this.page.getByText(target, { exact: false }); // fallback texto
  }
}
