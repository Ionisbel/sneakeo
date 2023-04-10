let addrs = [];

let nb;
let libl;
let name;
let total;

const og = "3 rue Elsa Triolet";

nb = 3;
libl = "rue";
name = "Elsa Triolet";
total = 50;

// for (let i = 0; i < total; i++) {

// }



String.prototype.double = function(index) {
    // console.log("vqlueof " + this.valueOf().charAt(index))
    return this.insert(index, this.valueOf().charAt(index));
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
    return char === " " || char == char.toUpperCase();
}

function multiJgl() {
    let args = [
        nb,
        jglWord(libl)];
    
    let split = name.split(' ');
    split.forEach(single => args.push(jglWord(single)));
    
    return combine(...args);
}

function jglWord(word, nexp) {
    let jgled = [];
    let chars = word.split('');
    const totalChars = chars.length;
    // console.log(chars);
    
    while (jgled.length < nexp) {

        
    }
    chars.forEach((char,index) => {
        if (isIgnore(char)) return;
        
        const doubled = word.double(index);
        // console.log("index" + index)
        !jgled.includes(doubled) && jgled.push(doubled);
    }); 
        
    return jgled;
}

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

function combine() {
    let count = 0;
    let combined = []

    // const lblLength = jgledLibl.length;
    // const nameLength = jgledName.length;

    while (count < total) {
        let res = '';

        for(let i=0; i < arguments.length; i++) {
            let argument = arguments[i];
            if (Array.isArray(argument))
                argument = argument[getRandomIndex(argument.length)];
            
            res += ` ${argument}`;
        }
        
        console.log(count + " " + res);
        if (!combined.includes(res)) {
            combined.push(res);
            count++;
        }
    }
}

// const levels = {
//     1: (str) => str.double(),
//     2: (str) => insert(),
//     3: (str) => delete()
// }
console.log(jglWord(libl));
console.log(jglWord(name));
console.log(multiJgl());