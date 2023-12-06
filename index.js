'use strict';
const Names = require('./names.json');
const Patterns = require('./patterns.json');
const Badwords = require('./badwords.json');
const Webwords = require('./web.json');

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

        for (let k = 0; k < badwordsRegex.length; ++k) {
            const regex = badwordsRegex[k];

            if (regex.test(name)) {
                return false;
            }
        }

        for (let k = 0; k < Webwords.length; ++k) {
            const word = Webwords[k];
            const word2 = word.replace(/-/, '');
            const lowerName = name.replace(/-/g, '').toLowerCase();

            if (
                word === lowerName || 
                word2 === lowerName || 
                `${word}s` === lowerName || 
                `${word2}s` === lowerName
            ) {
                return false;
            }
        }

        return true;
    }
}

module.exports = ReservedSubdomains;
