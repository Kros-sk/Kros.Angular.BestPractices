import * as constants from '../../support/constants';

export class Browser {

  private static awaitedRouteAliases: string[] = new Array<string>();

  public static visit(location: string) {
    cy.visit(location);
  }

  public static login() {
    cy.login();
  }

  public static reload() {
    cy.reload();
  }

  public static setupAwaitedRoutes(routes: RouteDefinition[]) {
    cy.server();
    routes.forEach((route, index) => {
      const alias = index + '-' + route.method;
      cy.route(route.method, route.url).as(alias);
      this.awaitedRouteAliases.push(alias);
    });
  }

  public static waitForRoutes() {
    this.awaitedRouteAliases.forEach((route) => {
      cy.wait('@' + route);
    });
    this.awaitedRouteAliases = new Array<string>();
  }

  public static getResponseBodyOfRequest(route: RouteDefinition, cbFunction: (body: any) => void) {
    cy.server();
    cy.route({
      method: route.method,
      url: route.url,
      onResponse: (response: XMLHttpRequest) => {
        cbFunction(response.response.body);
      }
    }).as('detail');

    cy.wait('@detail');
  }

  public static DeleteAccessToken() {
    window.localStorage.removeItem(constants.OIDC_USER);
  }

}

class RouteDefinition {
  public method: string;
  public url: string | RegExp;

  constructor() {
    this.method = '';
    this.url = '';
  }
}
