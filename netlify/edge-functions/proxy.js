export default async (request, context) => {
  // Obtenemos la URL del podcast del parámetro
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get("url");

  if (!targetUrl) {
    return new Response("Error: Falta el parámetro 'url'", { status: 400 });
  }

  // Hacemos la petición al servidor del podcast y devolvemos
  // la respuesta directamente (en streaming) a la aplicación.
  // Le añadimos nuestras propias cabeceras CORS para que el navegador no se queje.
  const response = await fetch(targetUrl);

  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");

  return new Response(response.body, {
    headers: headers,
    status: response.status,
    statusText: response.statusText
  });
};
