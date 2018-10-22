// const {SpeechToText}=require('speech-to-text');

// const onAnythingSaid = text => console.log(`Interim text: ${text}`);
// const onFinalised = text => console.log(`Finalised text: ${text}`);

// try {
//   const listener = new SpeechToText(onAnythingSaid, onFinalised);
//   listener.startListening();
// } catch (error) {
//   console.log(error);
// }
let dt=new Date().getDate();
let today=new Date().getDay();
let ndt=today===6?dt-1:(today===0?dt-2:dt-(today+2));
let ndate=new Date();
ndate.setDate(ndt);
let strdate=ndate.getDate()+'/'+(ndate.getMonth()+1)+'/'+ndate.getFullYear();
console.log(strdate);