import { ApiProperty } from "@nestjs/swagger";

export class CreateUtilisateurDto {
    @ApiProperty({description: "id unique de l'utilisateur"})
    id: number;
    @ApiProperty()
    nom: string;
    @ApiProperty()
    prenom:string;
}
