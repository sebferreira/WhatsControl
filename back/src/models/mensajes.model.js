import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
import Chat from "./chats.model.js";
const Mensaje = sequelize.define(
  "mensajes",
  {
    id_mensaje: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    mensaje: {
      type: DataTypes.TEXT,
    },
    fromMe: {
      type: DataTypes.BOOLEAN,
    },
    etapa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Mensaje.belongsTo(Chat, {foreignKey: "id_chat"});

Chat.hasMany(Mensaje, {foreignKey: "id_chat"});

Mensaje.sync();

export default Mensaje;
