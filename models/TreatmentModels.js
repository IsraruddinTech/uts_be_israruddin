import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Patient from "./PatientModels.js";

const Treatment = db.define(
    "Treatment",
    {
        id_perawatan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tanggal_perawatan: {
            type: DataTypes.DATE,
            allowNull: false
        },
        deskripsi: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        id_pasien: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Patient,  
                key: "id_pasien"  
            }
        },
        id_dokter: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "treatment",
        timestamps: true
    }
);

// Fungsi untuk mengatur relasi dengan Doctor
export const setupTreatmentDoctorAssociation = (Doctor) => {
    Treatment.belongsTo(Doctor, {
        foreignKey: "id_dokter",
        as: "Doctor"
    });
};

// Relasi dengan Patient
// Treatment.belongsTo(Patient, { foreignKey: 'id_pasien', as: 'Patient' });

export default Treatment;
