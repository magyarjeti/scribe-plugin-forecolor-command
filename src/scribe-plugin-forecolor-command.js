export default function() {
    return function(scribe) {
        var foreColorCommand = new scribe.api.Command('foreColor');

        var clean = function(root) {
            for (var i=0; i < root.childNodes.length; i++) {
                var node = root.childNodes[i];
                if (node.nodeType !== 1) {
                    continue;
                }

                node.style.color = "";
                clean(node);

                if (node.attributes.length == 1 && !node.getAttribute('style')) {
                    while (node.childNodes.length > 0) {
                        root.insertBefore(node.firstChild, node);
                    }
                    root.removeChild(node);
                    i--;
                }
            }

            root.normalize();
        };

        foreColorCommand.execute = function(color) {
            var selection = new scribe.api.Selection();
            var range = selection.range;
            var rangeContent = range.extractContents();

            var wrapper = document.createElement("span");
            wrapper.style.color = color;

            scribe.transactionManager.run(function () {
                clean(rangeContent);

                range.insertNode(rangeContent);
                range.surroundContents(wrapper);
            }.bind(this));
        };

        scribe.commands.foreColor = foreColorCommand;
    };
}
