module.exports = (sequelize, Sequelize) => {
    return sequelize.define("pagamento", {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_prenotazione: {
                type: Sequelize.BIGINT,
                unique: true,
                references: {
                    model:'prenotazioni',
                    key:'id',
                }
            },
            numero_carta: {
                type: Sequelize.STRING,
            },
            cvv: {
                type: Sequelize.INTEGER,
            },
            prezzo: {
                type: Sequelize.FLOAT,
            },
            intestatario: {
                type: Sequelize.STRING,
            },
            mese: {
                type: Sequelize.STRING,
            },
            anno: {
                type: Sequelize.STRING,
            }
        },
        {
            freezeTableName: true,
            timestamps: false,
        });
};