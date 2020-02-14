const raml2html = require('raml2html')

module.exports = (logger, server) => {
  const get = (req, res) => {
    logger.log('info', `docController: Received GET on /`)
    const configWithDefaultTheme = raml2html.getConfigForTheme()
    raml2html.render('doc.raml', configWithDefaultTheme).then(function (result) {
      res.send(result)
    }, function (error) {
      res.send(`${error}`)
    })
  }

  const map = () => {
    server.get('/', get)
  }

  return {
    map: map
  }
}
