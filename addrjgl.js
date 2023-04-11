const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const fakeable = {
    "l": "I",
    "o": "0",
    "e": "3",
    "a": "4"
}

const aliases = {
    rue: [ "r", "r.", "street", "str", "", "ru", "ru."]
}


/*A adapter *************************************/
const config = require("./config.json");

const nb = config.addr.number; // numéroe rue
const libl = config.addr.type;
const name = config.addr.calling; // nom de la rue
// const name = "Kosher Money"; // nom de la rue
const total = config.total;
/*************************************/


String.prototype.double = function(index) {
    // console.log("vqlueof " + this.valueOf().charAt(index))
    return this.insert(index, this.valueOf().charAt(index));
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

String.prototype.insert = function(index,char) {
    const splitted = this.splitIndex(index);
    // console.log(splitted);
    return `${splitted[0]}${char}${splitted[1]}`;
}

String.prototype.splitIndex = function(index) {
    return [
        this.substring(0,index), 
        this.substring(index)] 
}

function isIgnore(char) {
    return char === " ";
}

function lookAlike(char) {
    return fakeable[char];
}

function replaceLookAlike(word, index, char) {
    const la = lookAlike(char);
    if (la) 
        return word.replaceAt(index, la);

    return
}

function insertRandomChars(word, index) {
    return alphabet.map(letter => word.insert(index,letter.toLowerCase()))
}

function multiJgl() {
    let args = [
        ["0"+nb, "00"+nb, nb],
        [...aliases[libl], ...jglWord(libl)]
    ];
    
    let split = name.split(' ');
    split.forEach(single => args.push(jglWord(single)));
    
    return combine(...args);
}

function jglWord(word, totalJigs) {
    let jgled = [];
    let chars = word.split('');
    const totalChars = chars.length;
    // console.log(chars);

    chars.forEach((char,index) => {
        if (isIgnore(char)) return;
        
        const doubled = word.double(index);
        const replaced = replaceLookAlike(word, index, char);
        const inserted = insertRandomChars(word,index);
        
        let j1gsForChar = [ doubled ]
        replaced && j1gsForChar.push(replaced)
        config.randomInsert && j1gsForChar.push(...inserted)

        // console.log("index" + index)

        !jgled.includes(doubled) && jgled.push(...j1gsForChar);
    }); 
        
    return jgled;
}

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

function combine() {
    let combined = []

    // const lblLength = jgledLibl.length;
    // const nameLength = jgledName.length;

    while (combined.length < total) {
        let res = '';

        for(let i=0; i < arguments.length; i++) {
            let argument = arguments[i];
            if (Array.isArray(argument))
                argument = argument[getRandomIndex(argument.length)];
            
            res += ` ${argument}`;
        }
        
        if (!combined.includes(res))
            combined.push(res);
    }

    return combined;
}

// const levels = {
//     1: (str) => str.double(),
//     2: (str) => insert(),
//     3: (str) => delete()
// }
// console.log(jglWord(libl));
// console.log(jglWord(name));
const finalJigs = multiJgl();
console.log(finalJigs.join('\n'));
// console.log(finalJigs.length);