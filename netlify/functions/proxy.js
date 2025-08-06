const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Obtenemos la URL del podcast que viene como parámetro
  const targetUrl = event.queryStringParameters.url;

  if (!targetUrl) {
    return {
      statusCode: 400,
      body: 'Error: Falta el parámetro "url"',
    };
  }

  try {
    // Hacemos la petición al servidor del podcast
    const response = await fetch(targetUrl);

    // Obtenemos el contenido del audio como un stream de datos
    const audioBuffer = await response.buffer();

    // Devolvemos el audio a nuestra aplicación, conservando el tipo de contenido original
    return {
      statusCode: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'audio/mpeg',
      },
      body: audioBuffer.toString('base64'), // Se envía en base64
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error al contactar con el servidor del podcast: ${error.message}`,
    };
  }
};
