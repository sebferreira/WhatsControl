import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
const Chat = sequelize.define(
  "chats",
  {
    id_chat: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    usuario: {
      type: DataTypes.JSONB,
    },
    usuario_asignado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "No asignado",
    },
    asignado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pendiente",
    },
    /* ultimoMensaje: {
      type: DataTypes.STRING,
    }, */
  },
  {
    timestamps: true,
  }
);

Chat.sync();

export default Chat;
