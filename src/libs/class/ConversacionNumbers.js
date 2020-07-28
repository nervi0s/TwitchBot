class Conversacion {

    constructor(who, channel) {
        this.who = who;
        this.channel = channel;
        this.activeStatus = false;
        this.sumandos = [];
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

    autoDelele(array, user) {
        if (array.length > 0) {
            setTimeout(() => {
                for (let i = 0; i < array.length; i++) {
                    if (array[i].activeStatus == true && array[i].getNombre() == user) {
                        console.log("Juego's instance autoclean");
                        array.splice(i, 1);
                    }
                }
            }, 15000);
        }
    }

}

module.exports = Conversacion