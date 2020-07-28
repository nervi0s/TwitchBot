require('dotenv').config()

const utils = require('./utils/utils.js');
const funcionalities = require('./libs/funcionalities.js');

const AdivinaNum = require('./libs/class/AdivinaNum.js');
const Conversacion = require('./libs/class/ConversacionNumbers.js');

const tmi = require('tmi.js');

const client = new tmi.Client({
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: process.env.TWITCH_USER,
        password: process.env.TWITCH_TOKEN
    },
    channels: process.env.TWITCH_CHANNELS.split(",")
});

client.connect();

let instanceOfJuego;
let arrayConversaciones = [];

let instanceOfAdvina;
let arrayActiveAdivinaGames = [];


client.on('message', async (channel, tags, message, self) => {
    //console.log(arrayConversaciones)
    if (self) return;
    //console.log(tags)
    if (message.toLowerCase() === '!hello') {
        client.say(channel, `.me @${tags.username}, Hola soy un bot!`);
    }


    if (funcionalities.existInChannelInstanceOfAdivina(arrayActiveAdivinaGames, channel) == false) {

        if (message.toLowerCase() === '!juego') { //crea jugadores/conversaciones para el juego

            if (funcionalities.isUserAlreadyPlaying(arrayConversaciones, tags.username, channel) == false) {
                client.say(channel, `@${tags.username}, Dime un par de números! Recuerda, tienes 15 segundos`);
                instanceOfJuego = new Conversacion(tags.username, channel);
                instanceOfJuego.setGameActiveStatus(true);
                arrayConversaciones.push(instanceOfJuego);
                instanceOfJuego.autoDelele(arrayConversaciones, tags.username);
            } else {
                client.say(channel, `@${tags.username}, Ya estás jugando!`);
            }

        }
        if (arrayConversaciones.length != 0) { //Si existe alguna instancia del juego

            if (utils.getNumbersInMsg(message).length != 0) {
                for (let i = 0; i < arrayConversaciones.length; i++) { //Añade numeros elegidos a cada jugador
                    if (tags.username == arrayConversaciones[i].getNombre() && channel == arrayConversaciones[i].getChannel()) {
                        console.log(`-----CONSOLE: He encontrado un mensaje de este usuario: @${tags.username} que se puede añadir a la instancia de juego de Suma -----`)
                        let numeros = utils.getNumbersInMsg(message);

                        for (let num of numeros) {
                            let rawPhrase = await utils.getNumberPhrase(num);
                            arrayConversaciones[i].sumandos.push(rawPhrase);
                        }

                        console.log("-----CONSOLE:", arrayConversaciones, "Array con instancias del juego de suma -----");
                    }

                }
            }
        }

        for (let i = 0; i < arrayConversaciones.length; i++) {

            if (arrayConversaciones[i].sumandos.length >= 2) {
                let rawPhrase1 = arrayConversaciones[i].sumandos[0];
                let rawPhrase2 = arrayConversaciones[i].sumandos[1];
                arrayConversaciones[i].setGameActiveStatus(false);
                client.say(channel, `@${arrayConversaciones[i].getNombre()} ${await utils.translatePhrase(rawPhrase1)} ${await utils.translatePhrase(rawPhrase2)}`);
                arrayConversaciones.splice(i, 1); //Elimina el elemento (en este caso un objeto de la clase Conversacion) que ya ha sido resuelto
            }
        }
    } else {
        if (message.toLowerCase() === '!juego') {
            client.say(channel, `El juego de adivina un número está activo,\nespera a que acabe para usar ese comando :)`);
        }
    }


    if (funcionalities.existInChannelInstanceOfJuego(arrayConversaciones, channel) == false) {

        if (funcionalities.existInChannelInstanceOfAdivina(arrayActiveAdivinaGames, channel) == false) {

            if (message.toLowerCase() === '!adivina' && tags.mod) {

                client.say(channel, `Adivina un número entre 1 y 20!`);
                instanceOfAdvina = new AdivinaNum(tags.username, channel);
                instanceOfAdvina.setActiveStatus(true);
                instanceOfAdvina.generateRandom(1, 21);
                arrayActiveAdivinaGames.push(instanceOfAdvina);
                console.log("-----CONSOLE:", arrayActiveAdivinaGames, "Array con instancias del juego advina num random -----");

            } else if (message.toLowerCase() === '!adivina') {
                client.say(channel, `@${tags.username} El comando !adivina solo puede ser activado por un moderador`);
            }

        } else {

            if (message.toLowerCase() === '!adivina' && tags.mod) {
                client.say(channel, `@${tags.username} Adivina ya ha sido activado por otro moderador`);
            } else if (message.toLowerCase() === '!adivina') {
                client.say(channel, `@${tags.username} Adivina ya está activo y recuerda que este comando 
                solo puede ser usado por un moderador MrDestructoid`);
            }

        }

        if (utils.isNumber(message) == true) {

            for (let i = 0; i < arrayActiveAdivinaGames.length; i++) { //Compara las respuestas de los miembros del chat con el objeto del juego

                if (channel == arrayActiveAdivinaGames[i].getChannel()) {
                    console.log(`-----CONSOLE: He encontrado un mensaje de este usuario: @${tags.username} que se puede añadir al juego de adivina -----`)
                    if (arrayActiveAdivinaGames[i].numRandom == message) {
                        client.say(channel, `/me @${tags.username} ${arrayActiveAdivinaGames[i].message[channel]}`);
                        arrayActiveAdivinaGames.splice(i, 1)
                    }
                }

            }

        }

    } else {
        if (message.toLowerCase() === '!adivina') {
            client.say(channel, `El juego de suma está activo,\nespera a que acabe para usar ese comando :)`);
        }
    }

    //console.log("-----CONSOLE:", arrayConversaciones, "Array con instancias del juego de suma -----"); //Para depurar
    //console.log("-----CONSOLE:", arrayActiveAdivinaGames, "Array con instancias del juego advina num random -----"); //Para depurar

});

    //toDo:
    //[OK] Hacer que solo se pueda participar 1 vez hasta que sea haya "resuelto" el juego
    // Crear archivo en el disco con la gente que ha participado en el juego
    //[OK] Si alguien ha abiero un juego y ha pasado algún tiempo elimar ese objeto y al player
    //[OK] Hacer que el juego de la suma "elime isntancias al cabo de un tiempo" --> justo despues del push
