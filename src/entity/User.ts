import bcrypt from "bcryptjs";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IDX_78a916df40e02a9deb1c4b75ed", ["username"], { unique: true })
@Entity("user", { schema: "financias_casa" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "username", unique: true, length: 255 })
  username: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "role", length: 255 })
  role: string;

  @Column("datetime", {
    name: "createdAt",
    default: () => "'current_timestamp(6)'",
  })
  createdAt: Date;

  @Column("datetime", {
    name: "updatedAt",
    default: () => "'current_timestamp(6)'",
  })
  updatedAt: Date;


  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
