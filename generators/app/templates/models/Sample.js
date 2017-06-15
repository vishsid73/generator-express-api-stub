/**
 * Created by siddharthsrivastava on 17/12/15.
 */

module.exports = function(sequelize, DataTypes) {
    var Sample = sequelize.define("Sample", {
        id: {
            type:DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        sample_field: {type: DataTypes.STRING(100), unique: true, allowNull: false},
    },{
        underscored: true,
        tableName: 'SAMPLE',
        classMethods: {
            associate: function(models) {
                models.Sample.belongsTo(models.Sample1),
                models.Sample.belongsTo(models.Sample2, {as: 'sample_second'}),
                models.Sample.belongsTo(models.Sample3,{ as: 'sample_third', constraints: false }),
                models.Sample.hasMany(models.Sample3),
                models.Sample.hasMany(models.Sample4)

            }
        }
    });

    return Sample;
};