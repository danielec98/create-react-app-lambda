module.exports = (sequelize, Sequelize) => {
    return sequelize.define("immagini", {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            path: {
                type: Sequelize.STRING,
            },
            id_struttura: {
                type: Sequelize.BIGINT,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model:'strutture',
                    key:'id',
                }
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        });
};