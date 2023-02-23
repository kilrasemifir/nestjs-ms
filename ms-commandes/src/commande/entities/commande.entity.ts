import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Commande {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prix:number;

    @Column()
    utilisateurId: number;
}
