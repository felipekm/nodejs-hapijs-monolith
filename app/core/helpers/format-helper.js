'use strict';

const mongo = require('mongodb');
const ObjectID = mongo.ObjectID;

// validates Mongo ObjectID
exports.isOID = (oid) => {

  // coerce to string so the function can be generically used to test both strings and native objectIds created by the driver
  let valid = false;
  const str = String(oid),
    len   = str.length;

  if (len === 12 || len === 24) {
    valid = (/^[0-9a-fA-F]+$/).test(str);
  }

  return valid;
};

exports.arrayToObjectId = (arrayString) => {
  let index;
  const result = [];

  // Array assurance
  if (!Array.isArray(arrayString))
    arrayString = [arrayString];

  for (index = 0; index < arrayString.length; index += 1) {

    if (exports.isOID(arrayString[index]))
      result.push(new ObjectID(arrayString[index]));

  }

  return result;
};

exports.toOID = (stringOID) => {
  if (exports.isOID(stringOID)) return new ObjectID(stringOID);
  else return null;
};

exports.toOIDArray = (param) => {
  let index;
  const
    oids = param.split(','),
    result = [];

    // Looping
  for (index = 0; index < oids.length; index += 1) {

    // Oid check
    if (exports.isOID(oids[index])) {
      result.push(new ObjectID(oids[index]));
    }
  }

  // Returning parsed info
  return result;
};

exports.toCamelCase = (string, sufix) => {
  let i, words = [], currentWord, remainderWords = '';

  string = string.toLowerCase();
  words  = string.split(' ');

  const firstWord = `${words[0].charAt(0).toLowerCase()}${words[0].slice(1)}`;

  for (i = 1; i < words.length; i += 1) {
    currentWord = `${words[i].charAt(0).toUpperCase()}${words[i].slice(1)}`;
    remainderWords += currentWord;
  }

  if (sufix)
    return exports.replaceSpecialCharacters(`${firstWord}${remainderWords}${sufix}`);

  return exports.replaceSpecialCharacters(`${firstWord}${remainderWords}`);
};

exports.replaceSpecialCharacters = (word) => {
  let i = 0;

  for (i; i < word.length; i += 1) {

    switch (word.charAt(i)) {
      case 'Ç':
      case 'ç':
        word = word.substr(0, i) + 'c' + word.substr(i + 1);
        break;
      case 'Á':
      case 'À':
      case 'à':
      case 'á':
        word = word.substr(0, i) + 'a' + word.substr(i + 1);
        break;
      case 'É':
      case 'È':
      case 'é':
      case 'è':
        word = word.substr(0, i) + 'e' + word.substr(i + 1);
        break;
      case 'Í':
      case 'Ì':
      case 'í':
      case 'ì':
        word = word.substr(0, i) + 'i' + word.substr(i + 1);
        break;
      case 'Ó':
      case 'Ò':
      case 'ó':
      case 'ò':
        word = word.substr(0, i) + 'o' + word.substr(i + 1);
        break;
      case 'Ú':
      case 'Ù':
      case 'ú':
      case 'ù':
        word = word.substr(0, i) + 'u' + word.substr(i + 1);
        break;
      default:
        break;

    }
  }
  return word;
};

exports.firstCharLowerCase = (value) => `${value.charAt(0).toLowerCase()}${value.slice(1)}`;

module.exports = exports;