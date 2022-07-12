function compare(word1, word2){
    let percentage = 0;
    let outOf = 0;
    let total = 1;
    
    //length
    if(word1.length === word2.length){
        outOf += 1;
    }
    
    
    //for starting order.
    for(let s=0; s<word1.length; s++){
        total += 1;
        let char2 = ''
        if(word2.length >= s){
            char2 = word2.charAt(s);
        }
        if(char2 !== word1.charAt(s)){
            outOf += 1;
        }
    }

    //divide string
    for(let d =0; d< (word1.length-1); d++){
        for(let dd= 1; dd<word1.length; dd++){
            let compareString = '';
            compareString = word1.substring(d, dd);
            total += 1;
            if(word2.toString().indexOf(compareString) !== false){
                outOf += 1;
            }
            //how often string occurs
            compareString = new RegExp(compareString, 'gi');
            let matching1 = word1.match(compareString);
            matching1 = matching1.length; 
            if(matching1 >= 1){
                let matching2 = word2.toString().match(compareString);
                if(matching2 !== null){
                    matching2 = matching2.length
                    if(matching2 >= 1){
                        if(matching1 > matching2){
                            total += matching1;
                            outOf += matching1-(matching1-matching2);
                        }
                        else if(matching1 == matching2){
                            total += 1;
                            outOf += 1;
                        }
                        else{
                            total += matching1;
                            outOf += matching1-(matching2-matching1);
                        }
                    }
                }
            }
        }
    }

    percentage = (outOf/total)*100;

    let stats = {
        percentage: percentage,
        outOf: outOf,
        total: total
    }
    return stats;
}

function constructor(info){
    let constructing = '';
    if(info.indexOf("Array") > -1){
        constructing  = 'Array'
    }
    else if(info.indexOf("Number") > -1){
        constructing = "Number"
    }
    else if(info.indexOf("String") > -1){
        constructing = "String"
    }
    else if(info.indexOf('Boolean') > -1){
        constructing = "Boolean"
    }
    else if(info.indexOf('Array') > -1){
        constructing = 'Array'
    }
    else if(info.indexOf('Object') > -1){
        constructing = 'Object'
    }
    return constructing;
}


function ArrayDistance(arry1, arry2){
    let distance = 0;
    if(arry1.length !== arry2.length){
        if(arry1.length > arry2.length){
            distance += arry1.length - arry2.length;

        }
        else{
            distance += arry2.length - arry1.length;
        }
    }
    else{
        for(let a1 in arry1){
            let aa1 = arry1[a1];
            let aa2 = arry2[a1];
            if(aa1 !== aa2){
                let constructing1 = aa1.constructor.toString();
                let constructing2 = aa2.constructor.toString();
                constructing1 = constructor(constructing1);
                constructing2 = constructor(constructing2);
                if(aa1.length > aa2.length){
                    distance += (aa1.length-aa2.length)
                }
                else if(aa2.length > aa1.length){
                    distance += (aa2.length-aa1.length)
                }
                if(constructing1 !== constructing2){
                    distance++;
                    if((constructing1 === 'Array') && (constructing2 === 'Object')){
                        let aa2Arry = Object.keys(aa2).map((key) => [Number(key), aa2[key]]);
                        distance += ArrayDistance(aa1, aa2Arry);
                    }
                    else if((constructing1 === 'Object')&&(constructing2 === 'Array')){
                        let aa1Arry = Object.keys(aa1).map((key) => [Number(key), aa1[key]]);
                        distance += ArrayDistance(aa1Arry, aa2);
                    }
                    else if((constructing1 === 'String') &&(constructing2 === 'Number')){
                        let aa1No = parseInt(aa1);
                        if(aa1No > aa2){
                            distance += (aa1No-aa2);
                        }
                        else if(aa2 > aa1No){
                            distance += (aa2-aa1No);
                        }
                        let str2 = aa2.toString()
                        distance += compare(aa1, str2).outOf;
                    }
                    else if((constructing1 === 'Number') &&(constructing2 === 'String')){
                        let aa2No = parseInt(aa2);
                        if(aa2No > aa1){
                            distance += (aa2No-aa1);
                        }
                        else if(aa1 > aa2No){
                            distance += (aa1-aa2No);
                        }
                        let str1 = aa1.toString()
                        distance += compare(str1, aa2).outOf;
                    }
                    else if((constructing1 === 'Array')&&(constructing2 === 'String')){
                        let str1 = '';
                        for(let s1 in aa1){
                            str1 += aa1[s1];
                        }
                        distance += compare(str1, aa2).outOf;
                    }
                    else if((constructing1 === 'String')&&(constructing2 === 'Array')){
                        let str2 = '';
                        for(let s2 in aa2){
                            str2 += aa2[s2];
                        }
                        distance += compare(aa1, str2).outOf;
                    }
                    else if((constructing1 === 'Object')&&(constructing2 === 'String')){
                        aa1 = Object.keys(aa1).map((key) => [Number(key), aa1[key]]);
                        let str1 = '';
                        for(let s1 in aa1){
                            str1 += aa1[s1];
                        }
                        distance += compare(str1, aa2).outOf;
                    }
                    else if((constructing1 === 'String')&&(constructing2 === 'Object')){
                        aa2 = Object.keys(aa2).map((key) => [Number(key), aa2[key]]);
                        let str2 = '';
                        for(let s2 in aa2){
                            str2 += aa2[s2];
                        }
                        distance += compare(aa1, str2).outOf;
                    }
                    else if((constructing1 === 'Number')&&(constructing2 === 'Array')){
                        let str2 = '';
                        for(let s2 in aa2){
                            str2 += aa2[s2];
                        }
                        distance += compare(aa1, str2).outOf;
                    }
                    else if((constructing1 === 'Array')&&(constructing2 === 'Number')){
                        let str1 = '';
                        for(let s1 in aa1){
                            str1 += aa1[s1];
                        }
                        distance += compare(str1, aa2).outOf;
                    }
                    else if((constructing1 === 'Number')&&(constructing2 === 'Object')){
                        aa2 = Object.keys(aa2).map((key) => [Number(key), aa2[key]]);
                        let no2 = '';
                        for(let s2 in aa2){
                            no2 += aa2[s2];
                        }
                        no2 = parseInt(no2);
                        if(aa1 > no2){
                            distance += aa1-no2;
                        }
                        else if(no2 > aa1){
                            distance += no2-aa1;
                        }
                    }
                    else if((constructing1 === 'Object')&&(constructing2 === 'Number')){
                        aa1 = Object.keys(aa1).map((key) => [Number(key), aa1[key]]);
                        let no1 = '';
                        for(let s1 in aa1){
                            no1 += aa1[s1];
                        }
                        no1 = parseInt(no1);
                        if(aa2 > no1){
                            distance += aa2-no1;
                        }
                        else if(no1 > aa2){
                            distance += no1-aa2;
                        }
                    }
                }
                else{
                    if(constructing1 === 'Array'){
                        distance += ArrayDistance(aa1, aa2);
                    }
                    else if(constructing1 === 'Object'){
                        aa1Arry = Object.keys(aa1).map((key) => [Number(key), aa1[key]]);
                        aa2Arry = Object.keys(aa2).map((key) => [Number(key), aa2[key]]);
                        distance += ArrayDistance(aa1Arry, aa2Arry);
                    }
                    else if(constructing1 === 'String'){
                        distance += compare(aa1, aa2).outOf;
                    }
                    else if(constructing1 === 'Number'){
                        if(aa1 > aa2){
                            distance += (aa1-aa2);
                        }
                        else if(aa2 > aa1){
                            distance += (aa2-aa1);
                        }
                    }
                    else if(constructing1 === 'Boolean'){
                        if(aa1 !== aa2){
                            distance += 1;
                        }
                    }
                }
            }
        }
    }
    return distance;
}

console.log(ArrayDistance([1,3,4],[1,"45","67"]))
console.log(ArrayDistance([1,3,4],[1,45,"67"]))
console.log(ArrayDistance([1,3,4],[1,45,67]))
console.log(ArrayDistance([1,4,"Hello"],[1,5,'Hi']));
console.log(ArrayDistance([1,4,"Hello"],[1,5,'Hillo']));
console.log(ArrayDistance([1,[1,2,3],4],[1,5,4]));
console.log(ArrayDistance([1,[5],4],[1,5,4]));
console.log(ArrayDistance([1,"5",4],[1,5,4]));
console.log(ArrayDistance(['Hello', 'Mike'],
                          ['Hello', "Mike"]));
