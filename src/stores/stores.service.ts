import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StoresService {
  private readonly mockStores = [
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
}