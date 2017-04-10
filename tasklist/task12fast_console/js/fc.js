// document.querySelector('head').insertAdjacentHTML('beforeend', `
//   <!-- <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"> -->
//   <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css">
//   <link rel="stylesheet" href="css/index.css" type="text/css">
// `)

document.querySelector('body').insertAdjacentHTML('beforeend', `
  <div class="btn-open btn-lg">
    <span class="glyphicon glyphicon-asterisk"> Console</span>
  </div>

  <div class=" console-window">

    <div class="window-btn-top btn-group btn-group-justified">
      <btn class="btn btn-lg btn-primary " data-tag=".window-console">Console</btn>
      <btn class="btn btn-lg btn-primary active" data-tag=".window-network">Network</btn>
      <btn class="btn btn-lg btn-primary" data-tag=".window-storage">Storage</btn>
    </div>

    <div class="window-console none">
      <div class="btn-group btn-group-justified window-console-top">
        <btn class="btn btn-default active" data-tag="" data-action="all">All</btn>
        <btn class="btn btn-default" data-tag="" data-action="error">Error</btn>
        <btn class="btn btn-default" data-tag="" data-action="warn">Warn</btn>
        <btn class="btn btn-default" data-tag="" data-action="info">Info</btn>
        <btn class="btn btn-default" data-tag="" data-action="log">Log</btn>
      </div>
      <ol class="window-console-display">
      </ol>
    </div>

    <div class="window-network">
      <div class="btn-group btn-group-justified window-network-top">
        <btn class="btn btn-default active" data-tag="" data-action="resource">Resource</btn>
        <btn class="btn btn-default" data-tag="" data-action="xhr">XMLHttpRequest</btn>
      </div>
      <ol class="window-network-display">
      </ol>
    </div>

    <div class="window-storage none">
      <div class="btn-group btn-group-justified window-storage-top">
        <btn class="btn btn-default active" data-tag="" data-action="all">All</btn>
        <btn class="btn btn-default" data-tag="" data-action="localStorage">Storage</btn>
        <btn class="btn btn-default" data-tag="" data-action="cookie">Cookies</btn>
      </div>
      <ol class="window-storage-display">
      </ol>
    </div>

    <div class="tool-group">
      <div class="clear tool-btn">
        <span class="glyphicon glyphicon-ban-circle"></span>
      </div>&nbsp;&nbsp;&nbsp;&nbsp;
      <div class="refresh tool-btn">
        <span class="glyphicon glyphicon-refresh"></span>
      </div>
    </div>
  </div>
`)
// require('./js/xhr.js')
// require('./js/ajax.js')
// require('./js/pub.js')
// require('./js/console.js')
// require('./js/cookie.js')
// require('./js/storage.js')
// require('./js/res.js')
// require('./js/main.js')
// document.write(`
//   <script src="js/xhr.js"></script>
//   <script src="js/ajax.js"></script>
//   <script src="js/pub.js"></script>
//   <script src="js/console.js"></script>
//   <script src="js/cookie.js"></script>
//   <script src="js/storage.js"></script>
//   <script src="js/res.js"></script>
//   <script src="js/main.js"></script>
// `)
