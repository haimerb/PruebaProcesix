
/**
 * Configuracion  de proxy interna para permitir 
 * peticiones dentro del proyecto.
 *  
 */
  /*const proxy = [
    {
      context: '/api/persona/*',
      target: 'http://localhost:8000',
      secure:false,
      changeOrigin:true,
      pathRewrite: {'^/api/persona' : ''}
    }
  ];*/

  const proxy = [
    {
      context: '/PruebaTSGroup/resources/wsPruebaProcesix/*',
      target: 'http://localhost:8080',
      secure:false,
      changeOrigin:true,
      pathRewrite: {'^/PruebaTSGroup/resources/wsPruebaProcesix/' : ''}
    }
  ];
  module.exports = proxy;
  