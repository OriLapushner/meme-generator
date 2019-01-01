function importAll(r) {
    return r.keys().map(r);
  }
  
  const imgs = importAll(require.context('../media/memesImgs', false, /\.(png|jpe?g|svg)$/));
// import scumbagSteve from '../media/memesImgs/scumbag steve.jpg'
// import takeMyMoney from '../media/memesImgs/take my money.png'
// import noneOfMyBuis from '../media/memesImgs/none of my buisness.png'
// import overlyAttached from '../media/memesImgs/overly attached girlfriend.jpg'
// import daFuck from '../media/memesImgs/da fuck.jpg'
// import Dawg from '../media/memesImgs/dawg.jpg'
// import successKid from '../media/memesImgs/success kid.jpg'

export default imgs