const ElementPath = require('../').ElementPath


describe("src/index.ts", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  var jsdom = require('jsdom');
  

  it("jsdom@get():base", function (done) {
    jsdom.env("     <div>\n       <ul>\n        <li class=\"li1\">1</li>\n        <li class=\"li2\">2</li>\n        <li class=\"li3\">3</li>\n       </ul>\n     </div>", {
        features: {
          FetchExternalResources : ["script", "link"],
          ProcessExternalResources: ["script"]
        }
      },
      function (err, window) {
        global.window = window;
        ["document","navigator"].forEach(
          function (key) {
            global[key] = window[key];
          }
        );
        assert.equal(err, null);
        done();
      }
    );
  });
          
  it("get():base", function () {
    examplejs_printLines = [];
     let ep = new ElementPath()
     examplejs_print(ep.get(document.querySelector('.li1')))
     assert.equal(examplejs_printLines.join("\n"), "div-ul-li"); examplejs_printLines = [];
     examplejs_print(ep.get(document.querySelector('.li2')))
     assert.equal(examplejs_printLines.join("\n"), "div-ul-li2"); examplejs_printLines = [];
     examplejs_print(ep.get(document.querySelector('.li3')))
     assert.equal(examplejs_printLines.join("\n"), "div-ul-li3"); examplejs_printLines = [];
     examplejs_print(JSON.stringify(ep.get(null)))
     assert.equal(examplejs_printLines.join("\n"), "\"\""); examplejs_printLines = [];
     examplejs_print(ep.get(document.body))
     assert.equal(examplejs_printLines.join("\n"), "body"); examplejs_printLines = [];
     examplejs_print(ep.get(document.documentElement))
     assert.equal(examplejs_printLines.join("\n"), "html"); examplejs_printLines = [];
     examplejs_print(ep.get(document.querySelector('.li1').firstChild))
     assert.equal(examplejs_printLines.join("\n"), "div-ul-li"); examplejs_printLines = [];
  });
          
  it("jsdom@get():splitter", function (done) {
    jsdom.env("     <div>\n       <ul>\n        <li class=\"li1\">1</li>\n        <li class=\"li2\">2</li>\n        <li class=\"li3\">3</li>\n       </ul>\n     </div>", {
        features: {
          FetchExternalResources : ["script", "link"],
          ProcessExternalResources: ["script"]
        }
      },
      function (err, window) {
        global.window = window;
        ["document","navigator"].forEach(
          function (key) {
            global[key] = window[key];
          }
        );
        assert.equal(err, null);
        done();
      }
    );
  });
          
  it("get():splitter", function () {
    examplejs_printLines = [];
     let ep = new ElementPath({ splitter: '/' })
     examplejs_print(ep.get(document.querySelector('.li1')))
     assert.equal(examplejs_printLines.join("\n"), "div/ul/li"); examplejs_printLines = [];
     examplejs_print(ep.get(document.querySelector('.li2')))
     assert.equal(examplejs_printLines.join("\n"), "div/ul/li2"); examplejs_printLines = [];
     examplejs_print(ep.get(document.querySelector('.li3')))
     assert.equal(examplejs_printLines.join("\n"), "div/ul/li3"); examplejs_printLines = [];
  });
          
  it("jsdom@get():short", function (done) {
    jsdom.env("     <div>\n       <ul>\n        <li class=\"li1\">1</li>\n        <li class=\"li2\">2</li>\n        <li class=\"li3\">3</li>\n        <li class=\"li4\"><i>4</i></li>\n       </ul>\n     </div>", {
        features: {
          FetchExternalResources : ["script", "link"],
          ProcessExternalResources: ["script"]
        }
      },
      function (err, window) {
        global.window = window;
        ["document","navigator"].forEach(
          function (key) {
            global[key] = window[key];
          }
        );
        assert.equal(err, null);
        done();
      }
    );
  });
          
  it("get():short", function () {
    examplejs_printLines = [];
     let ep = new ElementPath({ tags: 'div,ul,li' })
     examplejs_print(ep.get(document.querySelector('.li1')))
     assert.equal(examplejs_printLines.join("\n"), "ABC"); examplejs_printLines = [];
     examplejs_print(ep.get(document.querySelector('.li2')))
     assert.equal(examplejs_printLines.join("\n"), "ABC2"); examplejs_printLines = [];
     examplejs_print(ep.get(document.querySelector('.li3')))
     assert.equal(examplejs_printLines.join("\n"), "ABC3"); examplejs_printLines = [];
     examplejs_print(ep.get(document.querySelector('.li4 i')))
     assert.equal(examplejs_printLines.join("\n"), "ABC4i"); examplejs_printLines = [];
  });
          
  it("jsdom@query():base", function (done) {
    jsdom.env("     <div>\n       <ul>\n        <li class=\"li1\">1</li>\n        <li class=\"li2\">2</li>\n        <li class=\"li3\">3</li>\n       </ul>\n     </div>", {
        features: {
          FetchExternalResources : ["script", "link"],
          ProcessExternalResources: ["script"]
        }
      },
      function (err, window) {
        global.window = window;
        ["document","navigator"].forEach(
          function (key) {
            global[key] = window[key];
          }
        );
        assert.equal(err, null);
        done();
      }
    );
  });
          
  it("query():base", function () {
    examplejs_printLines = [];
     let ep = new ElementPath()
     examplejs_print(ep.query('div-ul-li') === document.querySelector('.li1'))
     assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
     examplejs_print(ep.query('div-ul-li2') === document.querySelector('.li2'))
     assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
     examplejs_print(ep.query('div-ul-li3') === document.querySelector('.li3'))
     assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
     examplejs_print(ep.query(null))
     assert.equal(examplejs_printLines.join("\n"), "null"); examplejs_printLines = [];
     examplejs_print(ep.query('body') === document.body)
     assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
     examplejs_print(ep.query('html') === document.documentElement)
     assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("jsdom@get():splitter", function (done) {
    jsdom.env("     <div>\n       <ul>\n        <li class=\"li1\">1</li>\n        <li class=\"li2\">2</li>\n        <li class=\"li3\">3</li>\n       </ul>\n     </div>", {
        features: {
          FetchExternalResources : ["script", "link"],
          ProcessExternalResources: ["script"]
        }
      },
      function (err, window) {
        global.window = window;
        ["document","navigator"].forEach(
          function (key) {
            global[key] = window[key];
          }
        );
        assert.equal(err, null);
        done();
      }
    );
  });
          
  it("get():splitter", function () {
    examplejs_printLines = [];
     let ep = new ElementPath({ splitter: '/' })
     examplejs_print(ep.query('div/ul/li') === document.querySelector('.li1'))
     assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
     examplejs_print(ep.query('div/ul/li1') === document.querySelector('.li1'))
     assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
     examplejs_print(ep.query('div/ul/li2') === document.querySelector('.li2'))
     assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
     examplejs_print(ep.query('div/ul/li3') === document.querySelector('.li3'))
     assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
     examplejs_print(ep.query('div/ul/li4'))
     assert.equal(examplejs_printLines.join("\n"), "null"); examplejs_printLines = [];
     examplejs_print(ep.query('div/ul/li4/i'))
     assert.equal(examplejs_printLines.join("\n"), "null"); examplejs_printLines = [];
  });
          
  it("jsdom@get():short", function (done) {
    jsdom.env("     <div>\n       <ul>\n        <li class=\"li1\">1</li>\n        <li class=\"li2\">2</li>\n        <li class=\"li3\">3</li>\n        <li class=\"li4\"><i>4</i></li>\n       </ul>\n     </div>", {
        features: {
          FetchExternalResources : ["script", "link"],
          ProcessExternalResources: ["script"]
        }
      },
      function (err, window) {
        global.window = window;
        ["document","navigator"].forEach(
          function (key) {
            global[key] = window[key];
          }
        );
        assert.equal(err, null);
        done();
      }
    );
  });
          
  it("get():short", function () {
    examplejs_printLines = [];
     let ep = new ElementPath({ tags: 'div,ul,li' })
     examplejs_print(ep.query('ABC') === document.querySelector('.li1'))
     assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
     examplejs_print(ep.query('ABC2') === document.querySelector('.li2'))
     assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
     examplejs_print(ep.query('ABC3') === document.querySelector('.li3'))
     assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
     examplejs_print(ep.query('ABC4i') === document.querySelector('.li4 i'))
     assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
});
         