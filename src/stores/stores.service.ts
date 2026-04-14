import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StoresService {
  private readonly mockStores: any[] = [
    {
      id: 1,
      name: 'Lidl Marseille Saint-Barnabé',
      email: 'marseille-saintbarnabe@lidl.fr',
      phone: '0491000001',
      address: '12 Rue de Saint-Barnabé',
      zip_code: '13012',
      city: 'Marseille',
      country: 'France',
      latitude: 43.2965,
      longitude: 5.3698,
      opening_hours: 'Lun-Sam 8h-21h',
      slot_duration_minutes: 60,
      max_orders_per_slot: 20,
      avg_preparation_time_minutes: 30,
      drive_available: true,
      click_collect_available: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: 'Lidl Marseille La Valentine',
      email: 'marseille-lavalentine@lidl.fr',
      phone: '0491000002',
      address: '45 Avenue de la Valentine',
      zip_code: '13011',
      city: 'Marseille',
      country: 'France',
      latitude: 43.2897,
      longitude: 5.4231,
      opening_hours: 'Lun-Sam 8h-21h',
      slot_duration_minutes: 60,
      max_orders_per_slot: 15,
      avg_preparation_time_minutes: 25,
      drive_available: true,
      click_collect_available: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  findAll() {
    return this.mockStores;
  }

  findOne(id: number) {
    const store = this.mockStores.find(s => s.id === id);
    if (!store) throw new NotFoundException(`Magasin #${id} introuvable`);
    return store;
  }

  create(input: {
    name: string;
    email: string;
    phone: string;
    address: string;
    zip_code: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    opening_hours?: string | null;
    slot_duration_minutes: number;
    max_orders_per_slot: number;
    avg_preparation_time_minutes: number;
    drive_available?: boolean;
    click_collect_available?: boolean;
  }) {
    if (!input.name?.trim()) {
      throw new BadRequestException('Le nom du magasin est obligatoire');
    }

    const now = new Date();
    const created = {
      id: this.mockStores.length + 1,
      name: input.name,
      email: input.email,
      phone: input.phone,
      address: input.address,
      zip_code: input.zip_code,
      city: input.city,
      country: input.country,
      latitude: input.latitude,
      longitude: input.longitude,
      opening_hours: input.opening_hours ?? null,
      slot_duration_minutes: input.slot_duration_minutes,
      max_orders_per_slot: input.max_orders_per_slot,
      avg_preparation_time_minutes: input.avg_preparation_time_minutes,
      drive_available: input.drive_available ?? false,
      click_collect_available: input.click_collect_available ?? false,
      created_at: now,
      updated_at: now,
    };

    this.mockStores.push(created);
    return created;
  }
}