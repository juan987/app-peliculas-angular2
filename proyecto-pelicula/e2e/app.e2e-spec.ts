import { ProyectoPeliculaPage } from './app.po';

describe('proyecto-pelicula App', function() {
  let page: ProyectoPeliculaPage;

  beforeEach(() => {
    page = new ProyectoPeliculaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
