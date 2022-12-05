'use strict';
const Names = require('./names.json');
const Patterns = require('./patterns.json');
const Badwords = require('./badwords.json');

const namesMap = Names.reduce((accumulator, name) => {
    accumulator[name] = true;
    return accumulator;
}, {});

const patternsRegex = Patterns.map((pattern) => {
    return new RegExp(pattern);
});

const badwordsRegex = Badwords.map((badword) => {
    return new RegExp(`\\b${badword.replace(/(\W)/g, '\\$1')}\\b`, 'gi')
});

class ReservedSubdomains {
    static isNotValid(name) {
        return !this.isValid(name);
    }

    static isValid(name) {
        if (namesMap.hasOwnProperty(name)) {
            return false;
        }

        for (let i = 0; i < patternsRegex.length; ++i) {
            const regex = patternsRegex[i];

            if (regex.test(name)) {
                return false;
            }
        }

        for (let i = 0; i < badwordsRegex.length; ++i) {
            const regex = badwordsRegex[i];

            if (regex.test(name)) {
                return false;
            }
        }

        return true;
    }
}

module.exports = ReservedSubdomains;
