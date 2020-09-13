function existInChannelInstanceOfAdivina(arrayActiveAdivinaGames, channel) {
    for (let i = 0; i < arrayActiveAdivinaGames.length; i++) {
        if (arrayActiveAdivinaGames[i].getChannel() == channel) {
            return true;
        }
    }
    return false;
}

function existInChannelInstanceOfConversacion(arrayConversaciones, channel) {
    for (let i = 0; i < arrayConversaciones.length; i++) {
        if (arrayConversaciones[i].getChannel() == channel) {
            return true;
        }
    }
    return false;
}

function isUserAlreadyPlaying(arrayConversaciones, playerName, channel) {
    for (let i = 0; i < arrayConversaciones.length; i++) {
        if (arrayConversaciones[i].getName() == playerName && arrayConversaciones[i].getChannel() == channel) {
            return true;
        }
    }
    return false;
}

module.exports = { existInChannelInstanceOfAdivina, existInChannelInstanceOfConversacion, isUserAlreadyPlaying }