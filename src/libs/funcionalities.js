function existInChannelInstanceOfAdivina(arrayActiveAdivinaGames, channel) {
    for (let i = 0; i < arrayActiveAdivinaGames.length; i++) {
        if (arrayActiveAdivinaGames[i].getChannel() == channel) {
            return true;
        }
    }
    return false;
}

function existInChannelInstanceOfJuego(arrayConversaciones, channel) {
    for (let i = 0; i < arrayConversaciones.length; i++) {
        if (arrayConversaciones[i].getChannel() == channel) {
            return true;
        }
    }
    return false;
}

function isUserAlreadyPlaying(arrayConversaciones, playerName, channel) {
    for (let i = 0; i < arrayConversaciones.length; i++) {
        if (arrayConversaciones[i].getNombre() == playerName && arrayConversaciones[i].getChannel() == channel) {
            return true;
        }
    }
    return false;
}

module.exports = { existInChannelInstanceOfAdivina, existInChannelInstanceOfJuego, isUserAlreadyPlaying }