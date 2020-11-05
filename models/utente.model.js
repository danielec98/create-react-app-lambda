module.exports = (sequelize, Sequelize) => {
    return sequelize.define("utenti", {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            nome: {
                type: Sequelize.STRING,
            },
            cognome: {
                type: Sequelize.STRING,
            },
            data_di_nascita: {
                type: Sequelize.DATE,
            },
            password: {
                type: Sequelize.STRING,
            },
            citta: {
                type: Sequelize.STRING,
            },
            telefono: {
                type: Sequelize.STRING,
            },
            cap: {
                type: Sequelize.STRING,
            },
            tipo: {
                type: Sequelize.BOOLEAN,
            },
            partita_iva: {
                type: Sequelize.STRING,
            },
            indirizzo: {
                type: Sequelize.STRING,
            }
        },
        {
            freezeTableName: true,
            timestamps: false,
        });
};