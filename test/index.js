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
     let element = document.querySelector('.li1')
     examplejs_print(ep.get(element))
  });
          
});
         