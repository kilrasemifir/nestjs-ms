import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';

@Injectable()
export class UtilisateursService {

  constructor(
    @InjectRepository(Utilisateur)
    private repository: Repository<Utilisateur>
  ){}
  create(createUtilisateurDto: CreateUtilisateurDto) {
    return this.repository.save(createUtilisateurDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({where: {id}});
  }

  update(id: number, updateUtilisateurDto: UpdateUtilisateurDto) {
    return this.repository.update(id, updateUtilisateurDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
