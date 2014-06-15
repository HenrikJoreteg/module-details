# module-details

Give it the name of an npm module and get tons of up-to-date details about it. Useful for things like building static documentation sites that reference npm modules.

Turns out, gettin JSON about a package from npm is super simple, for example just open this in a browser: http://registry.npmjs.org/slugger

So, this module returns everything you can see there. Plus a few more goodies...

You'll notice that JSON includes the readme, which is awesome! But, if you actually want to render it into a template for a site somewhere you likely want to do a bit more with that readme.

So, what it does it this:

- Optionally, removes the first header an attaches it to that module data as a `title` property (npm modules have a name, but no pretty, properly capitalized titles)
- Hides anything in your readme between `<!-- starthide -->` and `<!-- endhide -->` comments you include in your markdown. 
    - This is useful for, say, adding a link to the readme saying where the full docs site is.
    - Or hiding other stuff
- You can also tell it to always hide sections with a certain title. For example, you may be doing this for lots of repos, to merge into a single site and you always want to hide a section in those readmes if they start with `license`.
- Creates a property called `toc` that it built from the headings in your readme. it includes their text content, heading-level, as well as a link text that can be used to embed an anchor to that.
- Turns all your headings into github-style headings where you hover and they're links.


## install

```
npm install module-details
```

## example

```javascript
var getModuleDetails = require('module-details');

// you don't have to send it anything other than a callback
getModuleDetails('slugger', function (err, moduleInfo) {
    // error or moduleInfo
});

// available options and their default settings
var options = {
    sectionsToRemove: [],
    hideFirstHeading: true
};

// you pass options as a second argument
getModuleDetails('slugger', options, function (err, moduleInfo) {
    // error or moduleInfo
});
```

## credits

If you like this follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.

## license

MIT

