var marked = require('marked');
var slugger = require('slugger');
var removeHidden = require('./remove-hidden');


module.exports = function (moduleInfo, options) {
    var result = {
        title: '',
        html: '',
        toc: []
    };

    var lexed = marked.lexer(removeHidden(moduleInfo.readme));
    var removing = false;
    var removingDepth;

    // remove all
    var cleaned = lexed.filter(function (item, index) {
        var isHeading = (item.type === 'heading');

        // grab our first line heading and remove it
        if (index === 0 && !result.title && isHeading) {
            result.title = item.text;
            result.toc.push({
                text: item.text,
                depth: item.depth,
                linkText: moduleInfo.name
            });
            if (options.hideFirstHeading) return false;
        }

        // we are removing, this is a new heading
        if (removing && isHeading && item.depth <= removingDepth) {
            removing = false;
        }

        // start of section to remove
        if (!removing && isHeading) {
            if (shouldRemove(item.text, options.sectionsToRemove)) {
                removing = true;
                removingDepth = item.depth;
            }
        }

        if (!removing) return true;
    });

    // add header link a. la. github
    var renderer = new marked.Renderer();
    renderer.heading = function (text, level) {
        var linkableText = moduleInfo.name + '-' + slugger(text);
        result.toc.push({
            text: text,
            depth: level,
            linkText: linkableText
        });
        var atag = '<a name="' + linkableText +'" class="anchor" href="#' + linkableText + '">';

        return atag + '<h' + level + '><span class="header-link"></span>' + text + '</h' + level + '></a>';
    }

    // copy over links property from lexed
    cleaned.links = lexed.links;

    result.html = marked.parser(cleaned, {renderer: renderer});

    return result;
}

function shouldRemove(actualTitle, sectionsToRemove) {
    var remove = false;
    (sectionsToRemove || []).some(function (sectionTitle) {
        if (actualTitle.toLowerCase().trim().indexOf(sectionTitle.toLowerCase()) === 0) {
            return remove = true;
        }
    });
    return remove;
}
