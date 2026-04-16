import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientService } from '../client/client.service';
import { PreparerService } from '../preparer/preparer.service';
import { ManagerService } from '../manager/manager.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly clientService: ClientService,
    private readonly preparerService: PreparerService,
    private readonly managerService: ManagerService,
  ) {}

  async login(email: string, password: string) {
    // 1. Cherche dans les clients
    const client = await this.clientService.findByEmail(email);
    if (client) {
      const valid = await bcrypt.compare(password, client.password);
      if (!valid) throw new UnauthorizedException('Identifiants invalides');
      return this.generateToken(client.id, 'CLIENT', client.preferred_store_id ?? null);
    }

    // 2. Cherche dans les préparateurs
    const preparer = await this.preparerService.findByWorkEmail(email);
    if (preparer) {
      const valid = await bcrypt.compare(password, preparer.password);
      if (!valid) throw new UnauthorizedException('Identifiants invalides');
      return this.generateToken(preparer.id, 'OPERATOR', preparer.store_id);
    }

    // 3. Cherche dans les managers
    const manager = await this.managerService.findByWorkEmail(email);
    if (manager) {
      const valid = await bcrypt.compare(password, manager.password);
      if (!valid) throw new UnauthorizedException('Identifiants invalides');
      return this.generateToken(manager.id, 'MANAGER', manager.store_id);
    }

    throw new UnauthorizedException('Identifiants invalides');
  }

  async register(input: {
    last_name: string;
    first_name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
  }) {
    const existing = await this.clientService.findByEmail(input.email);
    if (existing) {
      throw new ConflictException('Un compte existe déjà avec cet email');
    }

    const hashed = await bcrypt.hash(input.password, 10);

    const client = await this.clientService.create({
      permission_id: 1, // CLIENT
      last_name: input.last_name,
      first_name: input.first_name,
      email: input.email,
      password: hashed,
      phone: input.phone,
      address: input.address,
    });

    return this.generateToken(client.id, 'CLIENT', null);
  }

  private generateToken(userId: number, role: 'CLIENT' | 'OPERATOR' | 'MANAGER' | 'ADMIN', storeId: number | null) {
    const expiresIn = role === 'ADMIN' ? '10m' : '15m';
    const payload = { sub: userId, role, storeId };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn }),
      role,
    };
  }
}
