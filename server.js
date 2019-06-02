var express = require('express');
var app = express();
var server = require('http').createServer(app);
var rando = require('rando');  

var Telegraf = require('telegraf')
var port = process.env.PORT || 3000;
var io = require('socket.io')(server);


const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(process.env.BOT_TOKEN)



const My_keyboard = Markup.inlineKeyboard([
  Markup.urlButton('❤️', 'http://telegraf.js.org'),
  Markup.callbackButton('Delete', 'delete')
])


var messages = ["hello_world!"];

var randoInt = {
            type: 'int',
            min: 0,
            max: 255
          }
var start = "Эта интерактивная инсталяция, идея заключается в том что бы дать волю и свободу управлением состоянием видеоинсталяции посетителям выставки через мессенджер, вы можете управлять несколькими графическими элементами через кнопки 🖼 👾 🔮 🎉, так же писать текст, для того что бы написать текст просто напишите текст и бот все сделает) просьба соблюдать приличие!🤬"
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Static
app.use(express.static('public'));
app.use(express.static('node_modules/p5/lib/'));

//Router
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/draw.html');
});


io.sockets.on('connection',
  function newConnection(socket){
      // console.log(socket);
     console.log("Подключился: " + socket.id);

  
     socket.on("Gradient",
               function RGB(color){
                  console.log(color); //data
                  socket.broadcast.emit("Gradient", color); 
         });
  
      socket.on("Text",
               function textA(text){
                  // console.log(text); //data
                  socket.broadcast.emit("Text", text); 
         });
  
      
      bot.command('image', (ctx) => ctx.replyWithVideo({url: 'https://i.giphy.com/2PumACSgPaPAs.gif' }));
      // bot.on('text', (ctx) => ctx.reply(ctx.reply))
      bot.start((ctx) => {
           ctx.reply(start, Markup
            .keyboard([
                      ['🖼','👾'],
                      ['🔮','🎉'], // Row2 with 2 buttons
             
                      // ['Текст']
                      // ['📢 Ads', '⭐️ Rate us', '👥 '] // Row3 with 3 buttons
                    ])
            // .oneTime()
            .resize()
            .extra()
                  )
      });
      
      bot.help((ctx) => ctx.reply('Help message'));
      // bot.on('message', (ctx) => (ctx.from.id))
      // bot.action('delete', ({ deleteMessage }) => deleteMessage());
      // bot.hears('*', (ctx) => ctx.reply(ctx.reply.id))
      bot.on('sticker', (ctx) => ctx.reply('👍'));
  
      bot.hears('🖼', (ctx) => {ctx.reply('👍🏻');
                                //console.log('Hello!');
                                
                                var newSettings = { 'color':{ 
                                  'FromR': rando(randoInt),
                                  'ToR': rando(randoInt),
                                  'FromG': rando(randoInt),
                                  'ToG': rando(randoInt),
                                  'FromB': rando(randoInt),
                                  'ToB': rando(randoInt)  }};
                                            
                                socket.broadcast.emit("Gradient",newSettings)});
  
        bot.hears('🔮', (ctx) => {ctx.reply('👌🏻');
        //console.log('Hello!')
          socket.broadcast.emit("ExtraCanvas")});
      
        bot.hears('🎉', (ctx) => {ctx.reply('👌🏻');
        //console.log('Hello!')
          socket.broadcast.emit("ExtraGraphics")});
  
//        bot.hears('Изменить графику 3', (ctx) => {ctx.reply('Графика изменилась!');
//         //console.log('Hello!')
//         socket.broadcast.emit("perlinCanvas")});
  
       bot.hears('👾', (ctx) => {ctx.reply('👌🏻');
        //console.log('Hello!')
        socket.broadcast.emit("Emoji")});
  
        bot.hears('Текст', (ctx) => {ctx.reply('👌🏻');
        //console.log('Hello!')
        socket.broadcast.emit("Text")});
  
        bot.on('message', (ctx) => {
          // if(ctx.message.text.length <12){
            ctx.reply('👌🏻');
            console.log(ctx.message.text);
          //   //ctx.telegram.sendCopy(ctx.from.id, ctx.message);
            socket.broadcast.emit("customText",ctx.message);
          // }
          //  else ctx.reply('Cлишком длинный текст ничего не будет видно :с');
                                   });
        
        
  
        
  // extraGraphics
      
      // ExtraCanvas
  
      bot.launch();
      socket.on('disconnect', function() {
            console.log("Client has disconnected");
          });
  });
        