class Conversacion {

    constructor(who, channel) {
        this.who = who;
        this.channel = channel;
        this.activeStatus = false;
        this.rawPhrases = [];
    }

    getNombre() {
        return this.who;
    }
    getChannel() {
        return this.channel;
    }
    setGameActiveStatus(activeStatus) {
        this.activeStatus = activeStatus;
    }

    autoDelele(array, user, channel) {
        if (array.length > 0) {
            setTimeout(() => {
                for (let i = 0; i < array.length; i++) {
                    if (array[i].activeStatus == true && array[i].getNombre() == user && array[i].getChannel() == channel) {
                        console.log("Conversacion's instance autoclean");
                        //console.log(array[i])
                        array.splice(i, 1);
                    }
                }
            }, 15000);
        }
    }

}

module.exports = Conversacion