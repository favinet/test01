const {KMR, KKMA, OKT, KHAIII} = require('koalanlp/API');
const {initialize} = require('koalanlp/Util');
const {Tagger, Parser, SentenceSplitter} = require('koalanlp/proc');

async function executor(){
    await initialize({packages: {KHAIII: '2.1.4'}, verbose: true});

    let tagger = new Tagger(KHAIII, {khaResource : "/usr/local/share/khaiii"});
    let tagged = await tagger("안녕하세요. 눈이 오는 설날 아침입니다.");
    for(const sent of tagged) {
        console.log(sent.toString());
    }

    // let parser = new Parser(KHAIII, {khaResource : "/usr/local/share/khaiii"});
    // let parsed = await parser("안녕하세요. 눈이 오는 설날 아침입니다.");
    // for(const sent of parsed){
    //     console.log(sent.toString());
    //     for(const dep of sent.dependencies){
    //         console.log(dep.toString());
    //     }
    // }

    let splitter = new SentenceSplitter(KHAIII);
    let splitted = await splitter("안녕하세요. 눈이 오는 설날 아침입니다.");
    for(const split of splitted){
        console.log(split.toString());
        // for(const dep of split.dependencies){
        //     console.log(dep.toString());
        // }
    }

    // let parser = new Parser(KMR);
    // let parsed = await parser("안녕하세요. 눈이 오는 설날 아침입니다.");
    // for(const sent of parsed){
    //     console.log(sent.toString());
    //     for(const dep of sent.dependencies){
    //         console.log(dep.toString());
    //     }
    // }

}

executor()