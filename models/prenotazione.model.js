module.exports = (sequelize, Sequelize) => {
    return sequelize.define("prenotazioni", {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            id_struttura: {
                type: Sequelize.BIGINT,
                unique: true,
                references: {
                    model:'strutture',
                    key:'id',
                }
            },
            id_camere: {
                type: Sequelize.BIGINT,
                references: {
                    model:'camere',
                    key:'id',
                }
            },
            id_cliente: {
                type: Sequelize.BIGINT,
                references: {
                    model:'utenti',
                    key:'id',
                }
            },
            check_in: {
                type: Sequelize.DATE,
            },
            check_out: {
                type: Sequelize.DATE,
            },
            prezzo: {
                type: Sequelize.FLOAT,
            },
            pagamento_tasse: {
                type: Sequelize.BOOLEAN,
            },
            confermata: {
                type: Sequelize.BOOLEAN,
            },
            totale_tassa: {
                type: Sequelize.FLOAT,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        });
};