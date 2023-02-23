import { HttpService } from '@nestjs/axios/dist';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Commande } from './entities/commande.entity';

@Injectable()
export class CommandeService {
  private readonly UTILISATEUR_URL = process.env.UTILISATEUR_URL || "http://localhost:8000/utilisateurs/"
  constructor(
    @InjectRepository(Commande)
    private repository: Repository<Commande>,
    private httpService: HttpService
  ){}

  async create(dto: Commande) {
    const observable = await this.httpService.get(this.UTILISATEUR_URL+dto.utilisateurId);
    const res = await firstValueFrom(observable);

    if (res.status < 299){
      throw new BadRequestException("L'utilsiateur n'existe pas")
    }
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({where: {id}});
  }

  update(id: number, updateCommandeDto: UpdateCommandeDto) {
    return this.repository.update(id, updateCommandeDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
