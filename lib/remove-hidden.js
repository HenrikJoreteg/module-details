var hiddenRE = /(<\!\-\-+ *starthide *\-\-+>)([.\s\S\n]*?)(<\!\-\-+ *endhide *\-\-+>)/gim;


// strip out anything between <!-- starthide --> and <!-- endhide --> from markdown.
// this lets us show something the github rendered Readme, that doesn't show up here.
module.exports = function (markdown) {
    return markdown.replace(hiddenRE, '');
};
