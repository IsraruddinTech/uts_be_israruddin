import { DataTypes } from "sequelize";
import db from "../utils/connection.js";

const Departement = db.define(
    "Departement",
    {
        id_departemen: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nama_departemen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deskripsi_departemen: {
            type: DataTypes.TEXT,
            allowNull: true  
        }
    },
    {
        tableName: "departement",
        timestamps: true
    }
);

// Pindahkan relasi ke file terpisah untuk menghindari masalah circular dependency
// export const setupDepartementAssociations = (models) => {
//     Departement.hasMany(models.Doctor, {
//         foreignKey: "id_departemen",
//         as: "Doctors"
//     });
// };

export default Departement;
