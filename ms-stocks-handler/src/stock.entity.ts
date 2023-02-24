import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stock {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    produitId: number;
    @Column()
    produitNom: string;
    @Column()
    quantite: number;
    @Column()
    produitPrixUnitaire: number;
}
