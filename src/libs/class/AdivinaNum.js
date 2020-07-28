class AdivinaNum {
    constructor(who, channel) {
        this.who = who;
        this.channel = channel;
        this.activeStatus = false;
        this.numRandom;
        this.message = {
            "#tore1005": "Ha adivinado el número secreto y ha ganado un cofre! HolidayPresent",
            "#popitas123": "Bingo! lo has adivinado! FootGoal"
        }
    }
    generateRandom(minIncluded, maxExcluded) {
        minIncluded = Math.ceil(minIncluded);
        maxExcluded = Math.floor(maxExcluded);
        this.numRandom = Math.floor(Math.random() * (maxExcluded - minIncluded + 1)) + minIncluded;
    }
    getChannel() {
        return this.channel;
    }
    getNombre() {
        return this.who;
    }
    setActiveStatus(status) {
        this.activeStatus = status;
    }
}


module.exports = AdivinaNum