const {initialize} = require("koalanlp/Util");
const {Tagger} = require("koalanlp/proc");
const mecab = require('mecab-ya');
const readline = require('readline');
const { promisify } = require('util')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function processText(text){

    if (text == null || text.trim().length === 0) {
        rl.close();
        return;
    }
    try{
        const posAsync = promisify(mecab.pos);
        const result = await posAsync(text);
        console.log('pos : ', result);
    }catch (err) {
        console.log('Unhandled scor error.')
        console.log(err)
    }
    

    // mecab.pos(text, (err, result) => {
    //     //console.log('err : ', err);
    //     console.log('pos : ', result);
    // });

    // let sentences = await tagger(text);
    // sentences.forEach((sent, i) => {
    //     console.log(`===== Sentence #${i} =====`);
    //     console.log(sent.surfaceString());

    //     console.log("# Analysis Result");
    //     // console.log(sent.singleLineString());

    //     sent.forEach((word) => {
    //         process.stdout.write(`Word [${word.id}] ${word.surface} = `);

    //         word.forEach((morph) => {
    //             process.stdout.write(`${morph.surface}/${morph.tag} `);
    //         });
    //         process.stdout.write('\n');
    //     });
    // });

    readInput();
}

function readInput(){
    rl.question("분석할 문장을 입력하세요>> ", processText);
}

/***********************
 * Main Execution Part *
 ***********************/
 readInput();