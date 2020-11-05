module.exports = (sequelize, Sequelize) => {
    return sequelize.define("strutture", {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            tipologia: {
                type: Sequelize.STRING,
            },
            nome: {
                type: Sequelize.STRING,
            },
            citta: {
                type: Sequelize.STRING,
            },
            cap: {
                type: Sequelize.STRING,
            },
            indirizzo: {
                type: Sequelize.STRING,
                unique: true
            },
            prezzo: {
                type: Sequelize.FLOAT,
            },
            tassa: {
                type: Sequelize.FLOAT,
            },
            numero_ospiti: {
                type: Sequelize.INTEGER,
            },
            id_gestore: {
                type: Sequelize.BIGINT,
                references: {
                    model:'utenti',
                    key:'id',
                }
            },
            wifi: {
                type: Sequelize.BOOLEAN,
            },
            parcheggio: {
                type: Sequelize.BOOLEAN,
            },
            piscina: {
                type: Sequelize.BOOLEAN,
            },
            descrizione: {
                type: Sequelize.STRING,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        });
};