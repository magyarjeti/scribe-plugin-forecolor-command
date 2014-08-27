define("scribe-plugin-forecolor-command", ['scribe-common/src/element'], function($__0) {
  "use strict";
  var __moduleName = "scribe-plugin-forecolor-command";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var Element = $__0.default;
  var $__default = function() {
    return function(scribe) {
      var foreColorCommand = new scribe.api.Command('foreColor');
      var clean = function(root) {
        for (var i = 0; i < root.childNodes.length; i++) {
          var node = root.childNodes[i];
          if (node.nodeType !== 1) {
            continue;
          }
          node.style.color = "";
          clean(node);
          if (node.attributes.length == 1 && !node.getAttribute('style')) {
            Element.unwrap(root, node);
            i--;
          }
        }
      };
      foreColorCommand.execute = function(color) {
        var selection = new scribe.api.Selection();
        var range = selection.range;
        var rangeContent = range.extractContents();
        var wrapper = document.createElement("span");
        wrapper.style.color = color;
        scribe.transactionManager.run(function() {
          clean(rangeContent);
          range.insertNode(rangeContent);
          range.surroundContents(wrapper);
        }.bind(this));
      };
      scribe.commands.foreColor = foreColorCommand;
    };
  };
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
