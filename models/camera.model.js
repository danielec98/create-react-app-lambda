module.exports = (sequelize, Sequelize) => {
    return sequelize.define("camere", {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_struttura: {
                type: Sequelize.BIGINT,
                references: {
                    model:'strutture',
                    key:'id',
                }            
            },
            prezzo: {
                type: Sequelize.FLOAT,
            },
            foto: {
                type: Sequelize.STRING,
            },
            numero_ospiti: {
                type: Sequelize.INTEGER,
            },
            riscaldamento: {
                type: Sequelize.BOOLEAN,
            },
            aria_condizionata: {
                type: Sequelize.BOOLEAN,
            },
            servizio_in_camera: {
                type: Sequelize.BOOLEAN,
            },
            descrizione: {
                type: Sequelize.STRING,
            },
            nome: {
                type: Sequelize.STRING,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        });
};