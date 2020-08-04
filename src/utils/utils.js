const axios = require('axios');
const translate = require('google-translate-open-api').default;

function convertToNumber(str) {
    let convert = +str;
    return convert;
}

function isNumber(dato) {
    if (isNaN(dato)) {
        return false;
    } else {
        return true;
    }
}

function getNumbersInMsg(msg) {
    /* If the content of the msg is like that: msg = "2442.6 8 y    blablabla bla    0.5y3"
    ** then this will return an array like this: [ 2442.6, 8, 0.5, 3 ]
    **If the msg doesn't contain numbers: msg = "blabla bla bla bla...."
    **then this will return a empty array: []
    */
    let stringArrayWithNumbers = msg.match(/[0-9][.0-9]*/g);
    console.log(stringArrayWithNumbers, "Array del jugador con los número encontrados en su mensaje");
    let extractedNumbers = [];

    if (stringArrayWithNumbers != null) {
        for (strNumeric of stringArrayWithNumbers) {
            if (!isNaN(strNumeric)) {//Only push into extractedNumbers if and only if (iff) the element in array is a number
                extractedNumbers.push(convertToNumber(strNumeric));
            }
        }
    }
    return extractedNumbers;
}

async function getNumberPhrase(num) {
    let integerNumber = Math.ceil(num)
    let rawPhrase = await axios.get(`http://numbersapi.com/${integerNumber}`);
    return rawPhrase.data;
}

async function translatePhrase(rawPhrase) {
    let fraseTraducida = await translate(rawPhrase, { tld: "cn", to: "es", });
    let frase = fraseTraducida.data[0];
    return frase;
}

function isRequestToTransformToBinary(phrase) {

    let modifiedPhrase;
    let isMatch;
    let decimalNumber;

    modifiedPhrase = phrase.replace(/[.]|[,]/g, "");
    isMatch = modifiedPhrase.match(/[0-9]+ a binario/gi);

    if (isMatch) {
        decimalNumber = isMatch[0].split(" ")[0];
        return decimalNumber;
    }
    else {
        return false;
    }
}

function toBinay(integerNumber) {

    let arrayWithRest = [];

    do {
        arrayWithRest.push(integerNumber % 2);
        //console.log(integerNumber);
        integerNumber = parseInt(integerNumber / 2);
    } while (integerNumber != 0)
    //console.log(arrayWithRest.reverse());
    return arrayWithRest.reverse().toString().replace(/,/g, "");
}


module.exports = { convertToNumber, isNumber, getNumbersInMsg, getNumberPhrase, translatePhrase, isRequestToTransformToBinary, toBinay }