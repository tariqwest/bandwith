const models = require('../../models');

const influences = [
  { name: 'Beyonce', img: 'https://pbs.twimg.com/profile_images/729860687686717441/bqc52WDz.jpg' },
  { name: 'Taylor Swift', img: 'https://pbs.twimg.com/profile_images/713141309733646336/Yi8SGSW9.jpg' },
  { name: 'Bob Dylan', img: 'http://www.songnotes.cc/images/artists/BobDylan.jpg' },
  { name: 'Paul McCartney', img: 'https://s-media-cache-ak0.pinimg.com/736x/e9/c0/96/e9c096843df6150318c9c0537870e7a0.jpg' },
  { name: 'Kanye', img: 'https://68.media.tumblr.com/avatar_36944e8188c5_128.png' },
  { name: 'Michael Jackson', img: 'https://ichef.bbci.co.uk/images/ic/256x256/p01bqlx8.jpg' },
  { name: 'David Bowie', img: 'https://news.artnet.com/app/news-upload/2016/01/david-bowie-10-e1452530571993-256x256.jpg' },
  { name: 'Bob Marley', img: 'http://wac.450f.edgecastcdn.net/80450F/kpel965.com/files/2013/12/95841c04807c60c21052bfd1c4d1d8c9.jpeg' },
  { name: 'Jay Z', img: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/arts/2003/02/04/Jay-Z_square.jpg?w=300&q=55&auto=format&usm=12&fit=max&s=11da01d1f7441c3017b7c338b1c918ed' },
  { name: 'Prince', img: 'https://c-sf.smule.com/sf/s27/arr/ae/9b/a436f4e8-d3b5-4d7b-9df8-15a45a35fe04.jpg' },
];

module.exports = () => Promise.all(influences.map(influence =>
  models.Influence.forge({ influence_name: influence.name, influence_img: influence.img }).save()));
