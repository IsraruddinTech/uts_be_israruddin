import { DataTypes } from "sequelize";
import db from "../utils/connection.js";

const Patient = db.define(
    "Patient",
    {
        id_pasien: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tanggal_lahir: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        jenis_kelamin: {
            type: DataTypes.ENUM('Laki-laki', 'Perempuan'),
            allowNull: false
        },
        alamat: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nomor_telepon: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[0-9]+$/
            }
        }
    },
    {
        tableName: "patient",
        timestamps: true
    }
);

// Pindahkan relasi ke file terpisah untuk menghindari masalah circular dependency
// export const setupPatientAssociations = (models) => {
//     Patient.hasMany(models.Appointment, { foreignKey: 'id_pasien', as: 'Appointments' });
//     Patient.hasMany(models.Treatment, { foreignKey: 'id_pasien', as: 'Treatments' });
// };

export default Patient;
