const {initialize} = require("koalanlp/Util");
const {Tagger} = require("koalanlp/proc");
const {EUNJEON, KHAIII, KMR, ETRI, ARIRANG, DAON, RHINO, OKT, KKMA, HNN} = require("koalanlp/API");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tagger;

async function processText(text){
    if (text == null || text.trim().length === 0) {
        rl.close();
        return;
    }

    let sentences = await tagger(text);
    sentences.forEach((sent, i) => {
        console.log(`===== Sentence #${i} =====`);
        console.log(sent.surfaceString());

        console.log("# Analysis Result");
        // console.log(sent.singleLineString());

        sent.forEach((word) => {
            process.stdout.write(`Word [${word.id}] ${word.surface} = `);

            word.forEach((morph) => {
                process.stdout.write(`${morph.surface}/${morph.tag} `);
            });
            process.stdout.write('\n');
        });
    });

    readInput();
}

async function processText1(text){
    if (text == null || text.trim().length === 0) {
        rl.close();
        return;
    }
    let results = [];
    let sentences = await tagger(text);
    sentences.forEach((sent, i) => {
        //console.log(`===== Sentence #${i} =====`);
        //console.log(sent.surfaceString());

        //console.log("# Analysis Result");
        // console.log(sent.singleLineString());
        sent.forEach((word) => {
            //process.stdout.write(`Word [${word.id}] ${word.surface} = `);
            
            word.forEach((morph) => {
                let words = [];
                //process.stdout.write(`${morph.surface}, ${morph.tag} `);
                words.push(morph.surface);
                words.push(morph.tag.tagname);
                //console.log(JSON.stringify(morph.tag.tagname))
                results.push(words);
            });
            
        });
    });
    console.log('pos : ', results);
    readInput();
}

function readInput(){
    rl.question("분석할 문장을 입력하세요>> ", processText1);
}

/***********************
 * Main Execution Part *
 ***********************/
initialize({packages: {HNN: 'LATEST'}})  //KMR, ETRI, EUNJEON, ARIRANG, DAON, RHINO, OKT, KKMA, HNN, KHAIII
    .then(() => {
        //tagger = new Tagger(KHAIII,{khaResource : "/usr/local/share/khaiii"});
        tagger = new Tagger(HNN);
        readInput();
    }).catch((err) => console.error('Error occurred!', err));