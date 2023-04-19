let mecab = require('mecab-ya');
let text = '우연히 배민에서 곱도리창 보고 반신반의로 주문해봤는데 정말 맛있어서 놀랬어요. 부추 패이 식감이랑 조합이 너무 좋고 자극적이지 않고 간도 양념도 너무 좋았어요. 닭다리살이라 부드럽고 대창도 생각보다 꾀 있었구 담에 먹을 의향 아주 많음. 무조건 또 먹고싶네요. 벨누르지말아달라는 기사님의 요청도 너무 잘 들어주셔서 감사했네요.';

console.log(text);

mecab.pos(text, (err, result) => {
    //console.log('err : ', err);
    console.log('pos : ', result);
});

mecab.morphs(text, (err, result) => {
    //onsole.log('err : ', err);
    console.log('morphs : ', result);
});

mecab.nouns(text, (err, result) => {
    //console.log('err : ', err);
    console.log('nouns : ', result);
});


//console.log('nouns : ', mecab.nounsSync(text));clear